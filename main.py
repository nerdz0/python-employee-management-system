import pymysql 

import modules.login as Login

user_name = input(":: Username >>> ")
user_password = input(f":: Password for {user_name} >>> ")

try:
    connection_object = pymysql.Connection(
        host = "localhost",
        user = user_name,
        password = user_password,
        database = employees
    )

    if connection_object.open():
        print("--- Successfully Connected to Database ---")

except Exception as error0:
    print(f"Error :: {error0}")

try:
    while True:

        Login.login()

except KeyboardInterrupt as error1:
    print(f"\nError :: {error1}\n")
    