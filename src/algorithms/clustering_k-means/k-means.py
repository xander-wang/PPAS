#
# K-means Algorithm - A part of PPAS implementation
# Clustering algorithm that handles vector quantization for PPAS.
#
# Code written by Yuhui Wang on 16th April, 2018.
#
# Institute of Distributed Computing, Chuzhou University.

import mysql.connector
import numpy as np
np.set_printoptions(suppress=True)
from matplotlib import pyplot
import os
import datetime
import time
# 关联标签：性别M/F 年龄1 患病数量2 开销3 住院时间4


def M12():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.MWMDiagnosisCode FROM Patient_basic_data, Medical_event_brief_data WHERE Patient_basic_data.patientID = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        Str = ''.join(result[i][1])
        Line.append(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('1' + ';' + 'M12' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def F12():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.MWMDiagnosisCode FROM Patient_basic_data, Medical_event_brief_data WHERE Patient_basic_data.patientID = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        Str = ''.join(result[i][1])
        Line.append(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('2' + ';' + 'F12' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def M13():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense FROM Patient_basic_data, Medical_expense_data WHERE Patient_basic_data.patientID = Medical_expense_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][1] + result[i][2] + result[i][3]
        Line.append(result[i][0])
        Line.append(expense)
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('3' + ';' + 'M13' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')



def F13():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense FROM Patient_basic_data, Medical_expense_data WHERE Patient_basic_data.patientID = Medical_expense_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][1] + result[i][2] + result[i][3]
        Line.append(result[i][0])
        Line.append(expense)
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('4' + ';' + 'F13' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def M14():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Patient_basic_data, Medical_event_brief_data WHERE Patient_basic_data.patientID = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        Line.append(result[i][0])
        if str.find(str(result[i][2] - result[i][1]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][2] - result[i][1]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('5' + ';' + 'M14' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def F14():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Patient_basic_data, Medical_event_brief_data WHERE Patient_basic_data.patientID = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        Line.append(result[i][0])
        if str.find(str(result[i][2] - result[i][1]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][2] - result[i][1]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('6' + ';' + 'F14' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def M23():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense FROM Medical_event_brief_data, Medical_expense_data, Patient_basic_data WHERE Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][0])
        expense = result[i][1] + result[i][2] + result[i][3]
        Line = []
        Line.append(len(Str.split(',')[:-1]))
        Line.append(expense)
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('7' + ';' + 'M23' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def F23():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense FROM Medical_event_brief_data, Medical_expense_data, Patient_basic_data WHERE Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][0])
        expense = result[i][1] + result[i][2] + result[i][3]
        Line = []
        Line.append(len(Str.split(',')[:-1]))
        Line.append(expense)
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('8' + ';' + 'F23' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def M24():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Medical_event_brief_data, Patient_basic_data WHERE  Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][0])
        Line = []
        Line.append(len(Str.split(',')[:-1]))
        if str.find(str(result[i][2] - result[i][1]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][2] - result[i][1]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('9' + ';' + 'M24' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def F24():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Medical_event_brief_data, Patient_basic_data WHERE  Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][0])
        Line = []
        Line.append(len(Str.split(',')[:-1]))
        if str.find(str(result[i][2] - result[i][1]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][2] - result[i][1]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('10' + ';' + 'F24' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def M34():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Medical_expense_data, Medical_event_brief_data, Patient_basic_data WHERE  Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][0] + result[i][1] + result[i][2]
        Line.append(expense)
        if str.find(str(result[i][4] - result[i][3]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][4] - result[i][3]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('11' + ';' + 'M34' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def F34():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Medical_expense_data, Medical_event_brief_data, Patient_basic_data WHERE  Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][0] + result[i][1] + result[i][2]
        Line.append(expense)
        if str.find(str(result[i][4] - result[i][3]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][4] - result[i][3]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('12' + ';' + 'F34' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '\n')


def M123():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.MWMDiagnosisCode, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense FROM Patient_basic_data, Medical_event_brief_data, Medical_expense_data WHERE Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Medical_event_brief_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][1])
        expense = result[i][2] + result[i][3] + result[i][4]
        Line = []
        Line.append(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        Line.append(expense)
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('13' + ';' + 'M123' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


def F123():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.MWMDiagnosisCode, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense FROM Patient_basic_data, Medical_event_brief_data, Medical_expense_data WHERE Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Medical_event_brief_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][1])
        expense = result[i][2] + result[i][3] + result[i][4]
        Line = []
        Line.append(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        Line.append(expense)
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('14' + ';' + 'F123' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


def M124():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.MWMDiagnosisCode, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Patient_basic_data, Medical_event_brief_data WHERE Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][1])
        Line = []
        Line.append(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        if str.find(str(result[i][3] - result[i][2]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][3] - result[i][2]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('15' + ';' + 'M124' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


def F124():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_event_brief_data.MWMDiagnosisCode, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Patient_basic_data, Medical_event_brief_data WHERE Patient_basic_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Str = ''.join(result[i][1])
        Line = []
        Line.append(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        if str.find(str(result[i][3] - result[i][2]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][3] - result[i][2]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('16' + ';' + 'F124' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


def M134():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime From Patient_basic_data, Medical_expense_data, Medical_event_brief_data WHERE Patient_basic_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][1] + result[i][2] + result[i][3]
        Line.append(result[i][0])
        Line.append(expense)
        if str.find(str(result[i][5] - result[i][4]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][5] - result[i][4]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('17' + ';' + 'M134' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


def F134():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Patient_basic_data.dateOfBirth, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime From Patient_basic_data, Medical_expense_data, Medical_event_brief_data WHERE Patient_basic_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][1] + result[i][2] + result[i][3]
        Line.append(result[i][0])
        Line.append(expense)
        if str.find(str(result[i][5] - result[i][4]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][5] - result[i][4]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('18' + ';' + 'F134' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')

def M234():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Patient_basic_data, Medical_expense_data, Medical_event_brief_data WHERE Patient_basic_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '男'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][1] + result[i][2] + result[i][3]
        Str = ''.join(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        Line.append(expense)
        if str.find(str(result[i][5] - result[i][4]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][5] - result[i][4]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('19' + ';' + 'M234' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


def F234():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode, Medical_expense_data.outpatientExpense, Medical_expense_data.inpatientExpense, Medical_expense_data.personalExpense, Medical_event_brief_data.inhospitalDatetime, Medical_event_brief_data.outhospitalDatetime FROM Patient_basic_data, Medical_expense_data, Medical_event_brief_data WHERE Patient_basic_data.healthCardNumber = Medical_expense_data.healthCardNumber AND Medical_expense_data.healthCardNumber = Medical_event_brief_data.healthCardNumber AND Patient_basic_data.genderCode = '女'")
    result = cursor.fetchall()
    cursor.close()

    DATA = []
    for i in range(len(result)):
        Line = []
        expense = result[i][1] + result[i][2] + result[i][3]
        Str = ''.join(result[i][0])
        Line.append(len(Str.split(',')[:-1]))
        Line.append(expense)
        if str.find(str(result[i][5] - result[i][4]), 'day') == -1:
            Line.append(0)
        else:
            Line.append(str(result[i][5] - result[i][4]).split(' ')[0])
        floatLine = list(map(float, Line))
        DATA.append(floatLine)

    centroids_length, centroids, dataSet_length, dataSet, clusterAssment = K_Means(np.mat(DATA), 3)
    fp = open("result.txt", 'a')
    DATA = []
    fp.write('20' + ';' + 'F234' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';' + '0' + ';')
    for centroids_Cur in range(centroids_length):
        fp.write(str(centroids.tolist()[centroids_Cur]) + ';')
        for dataSet_Cur in range(dataSet_length):
            if clusterAssment[dataSet_Cur, 0] == centroids_Cur:
                DATA.append(dataSet.tolist()[dataSet_Cur])
        fp.write(str(DATA) + ';')
        DATA.clear()
    fp.write('\n')


# dataSet/dataMatrix矩阵存储所有data点的坐标信息
# clusterAssment矩阵与dataSet矩阵的结构一样，存储的是对应与dataSet里每个data点的扩展，对应的是每个data点的所属中心点信息和与该中心点的距离
# centroids矩阵存储各中心点的坐标


def Eclud(point, centroid): # 欧式距离公式
    return np.sqrt(np.sum(np.power(point - centroid, 2)))

def OriginalCentroids(dataSet, categories): # 在最大最小值范围内等比例随机生成所有中心点的第一维、第二维、
    dimension = np.shape(dataSet)[1]
    Centroids = np.mat(np.zeros([categories, dimension]))
    for i in range(dimension):
        Max = max(dataSet[:, i])
        Min = min(dataSet[:, i])
        Range = float(Max - Min)
        Centroids[:, i] = float(Min) + Range * np.random.rand(categories,1) # 在最大与最小范围内等比例随机生成所有中心点的第一维、第二维、
    return Centroids

def K_Means(dataSet, k):
    dataSet_length = np.shape(dataSet)[0] # dataSet矩阵的长度
    centroids_length = k # centroids矩阵的长度
    clusterAssment = np.mat(np.zeros([dataSet_length, 2])) # 生成并初始化clusterAssment矩阵
    centroids = OriginalCentroids(dataSet, k) # 调用OriginalCentroids()生成包含随机k个中心点的矩阵
    currentcluster = np.mat(np.zeros([dataSet_length, 1])) # 生成并初始化currentcluster矩阵，用于额外再次存储每次计算出的data点所属信息，用来与下次结果做比较，以此来判断是否计算完成

    clusterChanged = True # flag

    while clusterChanged: # 循环逼近
        clusterChanged = False # flag

        # 把每一个数据点划分到离它最近的中心点
        for dataSet_Cur in range(dataSet_length):
            clusterAssment[dataSet_Cur, 1] = float('inf')  # 给每一个data点距其中心点的距离默认设置为无穷大
            for centroids_Cur in range(centroids_length):
                current_dist = Eclud(dataSet[dataSet_Cur], centroids[centroids_Cur])  # 循环实现计算出每个data点距离当前所有中心点的距离
                if current_dist < clusterAssment[dataSet_Cur, 1]:  # 只要发现该距离小于当前自身距离最近中心点的距离（第一次默认为无穷大），就拿该中心点作为data点的新的中心点，并更新其所属新的中心点的种类和距离
                    clusterAssment[dataSet_Cur, 1] = current_dist
                    clusterAssment[dataSet_Cur, 0] = centroids_Cur

        # 重新计算中心点
        for centroids_Cur in range(centroids_length):
            current = []
            for dataSet_Cur in range(dataSet_length):
                if clusterAssment[dataSet_Cur, 0] == centroids_Cur:  # 寻找和当前中心点同色的data点
                    current.append(dataSet[dataSet_Cur, :])  # 如果找到，就将其data点的坐标添加到current内
            centroids[centroids_Cur] = np.mean(current, 0)  # 计算出current内的（当前同色的）所有data点的新的中心点坐标并覆盖掉原来的中心点坐标

        for dataSet_Cur in range(dataSet_length): # 判断是否可以结束循环
            if clusterAssment[dataSet_Cur, 0] != currentcluster[dataSet_Cur, 0]:  # 将当前每个data点的所属信息和距离信息与上一次比较，如果有变化则表示仍在更新，允许继续循环。同时更新上一次的所属信息和距离信息为本次的信息，为下次做准备
                clusterChanged = True
                currentcluster[dataSet_Cur, 0] = clusterAssment[dataSet_Cur, 0]

    return centroids_length, centroids, dataSet_length, dataSet, clusterAssment


def LinkStart():
    M12()
    F12()
    M13()
    F13()
    M14()
    F14()
    M23()
    F23()
    M24()
    F24()
    M34()
    F34()
    M123()
    F123()
    M124()
    F124()
    M134()
    F134()
    M234()
    F234()


if __name__ == '__main__':
    LinkStart()

