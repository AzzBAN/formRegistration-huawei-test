# Huawei Form Registration TEST

##### Azhar Baihaqi Nugraha

---

## Cloning Repository

```bash
$ git clone https://github.com/AzzBAN/formRegistration-huawei-test.git
```

## Frontend Setup

this app using HTML5, CSS3, and javascript on process developing this test.
follow this for setup:

```bash
$ cd Frontend
```

for running this app, you need to install [http-server](https://www.npmjs.com/package/http-server)
using npm:

```bash
$ npm i http-server
```

running frontend:

```
$ http-server -p 5500
```

open the link on browser http://127.0.0.1:5500/regis/registration.html

## Backend Setup

this backend-app using nodejs and express on process developing this test.
follow this for setup:

```bash
$ cd Backend
```

installing the nodejs package:
using npm:

```
$ npm install
```

This project uses environment variables to configure various settings. To set up the required environment variables, follow these steps:

### 1. Create a .env file

Create a file named `.env` in the root directory of your project.

### 2. Add Configuration

Add the following configuration to your `.env` file. Replace the placeholder values with your actual configuration.

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=8889
DB_NAME=huawei-test
DB_USERNAME=root
DB_PASSWORD=root

# Logging Configuration
LOG_LEVEL=trace

# JWT Secret
APP_JWT_SECRET=randompassword23
```

Running the backend process

```
$ npm run dev
```

## Automation Setup

### Prerequisites

Ensure you have the following prerequisites before running the script:

- Python 3.x installed
- Chrome WebDriver installed (download it [here](https://sites.google.com/chromium.org/driver/))

### setup

1. **Navigate to the project folder:**
   ```bash
   $ cd Automation
   ```
2. **Install the required Python packages:**
   ```bash
   $ pip install selenium
   ```

### Running the script

1. Open the `automation.py` script in a text editor.

2. Set the Chrome WebDriver path (replace `/path/to/chromedriver` with the actual path):

   ```python
   driver.get("http://127.0.0.1:5500/regis/registration.html")
   ```

3. Save the changes.

4. Run the script:

   ```bash
   python automation.py
   ```

### Test Cases

The script includes the following test cases:

1. **Test Case 1:** Submit the form with valid data.
2. **Test Case 2:** Submit the form with the wrong phone number format.
3. **Test Case 3:** Submit the form with the wrong email format.
4. **Test Case 4:** Submit the form with a password less than 8 characters.
5. **Test Case [LOGIN] 1:** Submit the login form with valid data.
6. **Test Case [LOGIN] 2:** Submit the login form with an invalid email format.
7. **Test Case [LOGIN] 3:** Submit the login form with an invalid password.

### Important Notes

- Make sure to update the Chrome WebDriver path in the script.
- Adjust sleep times in the script based on your machine's performance.
