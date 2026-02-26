from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'post@aretion.co.uk')

# Create the main app without a prefix
app = FastAPI(title="ARETION Informatics Solutions API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    organization: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    interest: Optional[str] = None
    message: str

class ContactSubmissionResponse(BaseModel):
    id: str
    name: str
    email: str
    organization: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: str
    success: bool = True
    message_response: str = "Your message has been received. We will contact you soon."


# Routes
@api_router.get("/")
async def root():
    return {"message": "ARETION Informatics Solutions API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(input: ContactSubmissionCreate):
    """
    Submit a contact form inquiry and send email notification
    """
    try:
        contact_dict = input.model_dump()
        contact_obj = ContactSubmission(**contact_dict)
        
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Save to database
        await db.contact_submissions.insert_one(doc)
        
        # Category labels
        category_labels = {
            "sales": "Sales Inquiry",
            "demo": "Schedule a Demo",
            "implementation": "Implementation & Integration",
            "partnership": "Partnership",
            "research": "Research Collaboration",
            "careers": "Careers/Recruitment",
            "other": "Other"
        }
        
        category_name = category_labels.get(contact_obj.interest, "General Inquiry")
        
        # Create HTML email content
        html_content = f"""
        <html>
        <body style="font-family: Georgia, serif; color: #3D1C1C; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1E3A5F; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">ARETION Informatics Solutions</h1>
                <p style="color: #C4A77D; margin: 5px 0 0 0;">New Contact Form Submission</p>
            </div>
            <div style="padding: 30px; background-color: #F5F0E8;">
                <h2 style="color: #1E3A5F; margin-top: 0;">Contact Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D; font-weight: bold; width: 150px;">Name:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D;">{contact_obj.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D; font-weight: bold;">Email:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D;"><a href="mailto:{contact_obj.email}" style="color: #1E3A5F;">{contact_obj.email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D; font-weight: bold;">Organization:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D;">{contact_obj.organization or 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D; font-weight: bold;">Category:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #C4A77D;">{category_name}</td>
                    </tr>
                </table>
                <h3 style="color: #1E3A5F; margin-top: 25px;">Message:</h3>
                <div style="background-color: white; padding: 15px; border-left: 4px solid #8B4513; margin-top: 10px;">
                    <p style="margin: 0; white-space: pre-wrap;">{contact_obj.message}</p>
                </div>
            </div>
            <div style="background-color: #3D1C1C; padding: 15px; text-align: center;">
                <p style="color: #C4A77D; margin: 0; font-size: 12px;">© 2026 ARETION & Company. All rights reserved.</p>
            </div>
        </body>
        </html>
        """
        
        # Send email via Resend
        try:
            params = {
                "from": SENDER_EMAIL,
                "to": [RECIPIENT_EMAIL],
                "subject": f"Contact Form: {category_name} - {contact_obj.name}",
                "html": html_content,
                "reply_to": contact_obj.email
            }
            email_result = await asyncio.to_thread(resend.Emails.send, params)
            logging.info(f"Email sent successfully: {email_result}")
        except Exception as email_error:
            logging.error(f"Failed to send email: {email_error}")
            # Continue even if email fails - form data is saved to database
        
        return ContactSubmissionResponse(
            id=contact_obj.id,
            name=contact_obj.name,
            email=contact_obj.email,
            organization=contact_obj.organization,
            interest=contact_obj.interest,
            message=contact_obj.message,
            created_at=doc['created_at'],
            success=True,
            message_response="Thank you for contacting ARETION Informatics Solutions. We will get back to you within 24-48 hours."
        )
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactSubmissionResponse])
async def get_contact_submissions():
    """
    Get all contact form submissions (admin endpoint)
    """
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    result = []
    for sub in submissions:
        result.append(ContactSubmissionResponse(
            id=sub['id'],
            name=sub['name'],
            email=sub['email'],
            organization=sub.get('organization'),
            interest=sub.get('interest'),
            message=sub['message'],
            created_at=sub['created_at'] if isinstance(sub['created_at'], str) else sub['created_at'].isoformat(),
            success=True,
            message_response="Retrieved successfully"
        ))
    
    return result


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
