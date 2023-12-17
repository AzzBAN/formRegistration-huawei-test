from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

# Start the WebDriver
driver = webdriver.Chrome()

# Open the registration form page
driver.get("http://127.0.0.1:5500/Frontend/regis/registration.html")

# Function to find an element by its ID
def find_element_by_id(element_id):
    return driver.find_element(By.ID, element_id)

def clear_all_element():
    find_element_by_id("fname").clear()
    find_element_by_id("fPnumber").clear()
    find_element_by_id("lemail").clear()
    find_element_by_id("lpassword").clear()
    
def clear_all_element_login():
    find_element_by_id("lemail").clear()
    find_element_by_id("lpassword").clear()    

# Test Case 1: Submit the form with valid data
find_element_by_id("fname").send_keys("Azhar Baihaqi Nugraha")
time.sleep(0.3) 
find_element_by_id("fPnumber").send_keys("081223727292")
time.sleep(0.3) 
find_element_by_id("lemail").send_keys("azhar@gmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass!123")
time.sleep(0.3) 
find_element_by_id("fname").click()  # Clicking somewhere to trigger onblur
find_element_by_id("registrator").submit()
time.sleep(2)  # Wait for the page to submit
clear_all_element()

# Test Case 2: Submit the form with wrong phone number data
find_element_by_id("fname").send_keys("Azhar Baihaqi Nugraha")
time.sleep(0.3) 
find_element_by_id("fPnumber").send_keys("0812237272")
time.sleep(0.3) 
find_element_by_id("lemail").send_keys("azhar@gmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass!123")
time.sleep(0.3) 
find_element_by_id("fname").click()  # Clicking somewhere to trigger onblur
find_element_by_id("registrator").submit()
time.sleep(2)  # Wait for the page to submit
clear_all_element()

# Test Case 3: submit the form with wrong email format
find_element_by_id("fname").send_keys("Azhar Baihaqi Nugraha")
time.sleep(0.3) 
find_element_by_id("fPnumber").send_keys("081223727292")
time.sleep(0.3) 
find_element_by_id("lemail").send_keys("azhargmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass!123")
time.sleep(0.3) 
find_element_by_id("fname").click()  # Clicking somewhere to trigger onblur
find_element_by_id("registrator").submit()
time.sleep(2)  # Wait for the page to submit
clear_all_element()

# Test Case 4: submit the form with wrong email format
find_element_by_id("fname").send_keys("Azhar Baihaqi Nugraha")
time.sleep(0.3) 
find_element_by_id("fPnumber").send_keys("081223727292")
time.sleep(0.3) 
find_element_by_id("lemail").send_keys("azhar@gmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass123")
time.sleep(0.3) 
find_element_by_id("fname").click()  # Clicking somewhere to trigger onblur
find_element_by_id("registrator").submit()
time.sleep(2)  # Wait for the page to submit
clear_all_element()

# move to login page for make sure the data is saved and can be logged
find_element_by_id("loginLink").click()

# Test Case [LOGIN] 1: submit the form login with valid data
find_element_by_id("lemail").send_keys("azhar@gmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass!123")
time.sleep(0.3) 
find_element_by_id("lemail").click()  # Clicking somewhere to trigger onblur
find_element_by_id("login").submit()
time.sleep(2)  # Wait for the page to submit
# clear_all_element()

driver.back()
clear_all_element_login()
time.sleep(1)  # Wait for the page to submit

# Test Case [Login] 2: submit the form login with not valid email data
find_element_by_id("lemail").send_keys("azhargmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass!123")
time.sleep(0.3) 
find_element_by_id("lemail").click()  # Clicking somewhere to trigger onblur
find_element_by_id("login").submit()
time.sleep(2)  # Wait for the page to submit
clear_all_element_login()

# Test Case [Login] 2: submit the form login with not valid password data
find_element_by_id("lemail").send_keys("azhar@gmail.com")
time.sleep(0.3) 
find_element_by_id("lpassword").send_keys("pass123")
time.sleep(0.3) 
find_element_by_id("lemail").click()  # Clicking somewhere to trigger onblur
time.sleep(2)  # Wait for the page to submit
find_element_by_id("login").submit()
time.sleep(2)  # Wait for the page to submit
# clear_all_element_login()

driver.quit()
