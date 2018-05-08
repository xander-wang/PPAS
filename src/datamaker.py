#
# Datamaker - A part of PPAS implementation
# Tool used to generate sequence of data and dump it into the PPAS database.
#
# Script initially written by Xander Wang on 8th Feb, 2018.
# Modified by Xander Wang on 6th March, 2018.
#
# Institute of Distributed Computing, Chuzhou University.

import random
import time
import mysql.connector


def random_datetime_generator():
    s = (2012, 1, 1, 0, 0, 0, 0, 0, 0)
    e = (2014, 12, 31, 23, 59, 59, 0, 0, 0)

    start = time.mktime(s)
    end = time.mktime(e)

    dt1 = random.randint(start, end)    # Key: visitDatetime
    dt2 = random.randint(start, end)    # Key: inhospitalDatetime
    dt3 = random.randint(start, end)    # Key: outhospitalDatetime
    dt4 = random.randint(start, end)    # key: attackDatetime

    while (dt1 < dt2 < dt3) is not True:    # Chronological check
        dt1 = random.randint(start, end)  # Key: visitDatetime
        dt2 = random.randint(start, end)  # Key: inhospitalDatetime
        dt3 = random.randint(start, end)  # Key: outhospitalDatetime

    dt1_tuple = time.localtime(int(dt1))
    dt2_tuple = time.localtime(int(dt2))
    dt3_tuple = time.localtime(int(dt3))
    dt4_tuple = time.localtime(int(dt4))

    dt1_rtn = time.strftime("%Y-%m-%d-%H-%M-%S", dt1_tuple)
    dt2_rtn = time.strftime("%Y-%m-%d-%H-%M-%S", dt2_tuple)
    dt3_rtn = time.strftime("%Y-%m-%d-%H-%M-%S", dt3_tuple)
    dt4_rtn = time.strftime("%Y-%m-%d-%H-%M-%S", dt4_tuple)

    return [dt1_rtn, dt2_rtn, dt3_rtn, dt4_rtn]


def random_expense_generator():
    exp1 = random.randint(200, 20000)   # Key: outpatientExpense
    exp2 = random.randint(200, 20000)   # Key: inpatientExpense
    exp3 = random.randint(200, 20000)   # Key: personalExpense

    while ((exp1 < exp2) and (exp3 < (exp1 + exp2))) is not True:  # Logic check
        exp1 = random.randint(200, 20000)  # Key: outpatientExpense
        exp2 = random.randint(200, 20000)  # Key: inpatientExpense
        exp3 = random.randint(200, 20000)  # Key: personalExpense

    return [exp1, exp2, exp3]


def random_diagnosis_code_generator():  # ICD-10 in general type
    major_a = random.choice(range(65, 85))
    return chr(major_a)


def update_value():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='localhost')
    cursor = con.cursor()
    cursor.execute("use patient")
    for i in range(0, 1435):
        item_set = ['01', '02', '03', '04', '05', '06', '07', '08', '99']
        item = random.choice(item_set)
        datetime_combo = random_datetime_generator()
        expense_combo = random_expense_generator()
        number_of_diseases = [1, 2, 3, 4, 5, 6]
        code = ""
        for j in range(1, random.choice(number_of_diseases)+1):
            code = code + random_diagnosis_code_generator() + ','
        command = """UPDATE Medical_event_brief_data SET MWMDiagnosisCode=%(code)s WHERE id=%(i)s"""
        cursor.execute(command, {'code': code, 'i': i})
        code = ""
    con.commit()


if __name__ == '__main__':
    update_value()