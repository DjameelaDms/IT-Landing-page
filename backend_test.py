#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class AretionAPITester:
    def __init__(self, base_url="https://medical-solutions.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_text": response.text[:500] if response.text else "",
                "data_sent": data
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_json = response.json()
                    print(f"   Response: {json.dumps(response_json, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                self.failed_tests.append(f"{name} - Status {response.status_code}")
                
            self.results.append(result)
            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name} - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e),
                "data_sent": data
            }
            self.results.append(result)
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root Endpoint",
            "GET", 
            "",
            200
        )

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )

    def test_get_status_checks(self):
        """Test retrieving status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

    def test_submit_contact_form(self):
        """Test submitting contact form"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "organization": "Test Hospital",
            "interest": "disasterms",
            "message": "This is a test contact form submission."
        }
        return self.run_test(
            "Submit Contact Form",
            "POST",
            "contact",
            200,
            data=test_data
        )

    def test_get_contact_submissions(self):
        """Test retrieving contact submissions"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "contact",
            200
        )

    def test_contact_form_validation(self):
        """Test contact form with missing required fields"""
        test_data = {
            "name": "Test User"
            # Missing email and message
        }
        return self.run_test(
            "Contact Form Validation (Missing Fields)",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )

    def test_invalid_email_format(self):
        """Test contact form with invalid email"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "Test message"
        }
        return self.run_test(
            "Contact Form Invalid Email",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )

    def run_all_tests(self):
        """Run comprehensive API testing"""
        print("🚀 Starting ARETION Informatics Solutions API Tests")
        print(f"📍 Testing API at: {self.api_url}")
        print("=" * 60)

        # Test all endpoints
        self.test_root_endpoint()
        self.test_create_status_check()
        self.test_get_status_checks()
        self.test_submit_contact_form()
        self.test_get_contact_submissions()
        
        # Test validation
        self.test_contact_form_validation()
        self.test_invalid_email_format()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")

        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for failed in self.failed_tests:
                print(f"   - {failed}")
        
        return self.tests_passed, self.tests_run, self.failed_tests, self.results

def main():
    """Main function to run tests"""
    try:
        tester = AretionAPITester()
        passed, total, failed, results = tester.run_all_tests()
        
        # Save results to file
        with open('/app/backend_test_results.json', 'w') as f:
            json.dump({
                "summary": {
                    "tests_passed": passed,
                    "tests_total": total,
                    "success_rate": f"{(passed/total)*100:.1f}%",
                    "timestamp": datetime.now().isoformat()
                },
                "failed_tests": failed,
                "detailed_results": results
            }, f, indent=2)
        
        print(f"\n📋 Detailed results saved to: /app/backend_test_results.json")
        
        # Return appropriate exit code
        return 0 if passed == total else 1
        
    except Exception as e:
        print(f"💥 Test execution failed: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())