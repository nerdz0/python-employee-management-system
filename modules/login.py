def login():
    print("==================================")
    print("    Employee Management System    ")
    print("==================================")
    print("[1]    Login as Administrator")
    print("[2]    Login as Manager")
    print("[3]    Login as Emplyee")
    print("[4]    Exit")
    choice = input("\n:: Select option >>> ")
    
    if choice == '1':
        print("\n--- Logged in as Administrator ---\n")
    
    elif choice == '2':
        print("\n--- Logged is as Manager ---\n")

    elif choice == '3':
        print("\n--- Logged in as Employee ---\n")

    elif choice == '4':
        print("\n--- Thank you ---\n")