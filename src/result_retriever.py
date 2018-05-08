#
# result_retriever - A part of PPAS implementation
# Retrieve Hive results to MySQL.
#
# Code written by Xander Wang on 16th April, 2018.
#
# Institute of Distributed Computing, Chuzhou University.

import mysql.connector


def result_import(file_path, table_name, ):
    # Open file
    file = open(file_path,'r')




    # Connect MySQL and init it
    connection = mysql.connector.connect(user='root', password='Iamthesudoer', host='localhost')
    cursor = connection.cursor()
    cursor.execute("use patient")

    # Import logic
    i = 0
    for line in file.readlines():
        i = i + 1
        result = line.replace("\n", "").split(',')
        result.insert(0, str(i))
        print(result)
        command = """INSERT INTO %(table_name)s VALUES (%(1)s, %(2)s, %(3)s, %(4)s, %(5)s)"""
        cursor.execute(command, {'table_name': table_name, '1': result[0], '2': result[1], '3': result[2], '4': result[3], '5': result[4]})


result_import('/Users/xander/Desktop/000000_0', 'Patients_statistics_expense')

