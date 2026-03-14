import pymysql 

import modules.login as login

user_name = input(":: Enter user name >>> ")
user_password = input(f":: Enter password for {user_name}>>> ")

try:
    connection_object = pymysql.Connection(
        host = "localhost",
        user = user_name,
        password = user_password,
        database = employees
    )

    if connection_object.open():
        print("--- Successfully Connected to Database ---")

except Exception as error:
    print(f"Error :: {error}")

while True:
    
    login.login_as()