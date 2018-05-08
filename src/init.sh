#
# PPAS Initialization Shell Code - A part of PPAS implementation
# Execute Hive/algorithm-related commands and start the PPAS server.
#
# Code written by Xander Wang on 16th April, 2018.
#
# Institute of Distributed Computing, Chuzhou University.

#!/bin/bash

echo "
＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠
＠＠＠＠　　　　　　　＠＠＠＠＠＠＠＠　　　　　　　＠＠＠＠＠＠＠＠＠＠　　　　＠＠＠＠＠＠＠＠＠＠　　　　　　＠＠＠＠
＠＠＠＠　　　　　　　＠＠＠＠＠＠＠＠　　　　　　　＠＠＠＠＠＠＠＠＠　　　　　＠＠＠＠＠＠＠＠＠＠　　　　　　＠＠＠＠
＠＠＠＠　　　＠　　　　＠＠＠＠＠＠＠　　　＠　　　　＠＠＠＠＠＠＠＠　　　　　＠＠＠＠＠＠＠＠＠　　　　＠＠　＠＠＠＠
＠＠＠＠　　　＠　　　　＠＠＠＠＠＠＠　　　＠　　　　＠＠＠＠＠＠＠＠　　　　　　＠＠＠＠＠＠＠＠　　　　＠＠＠＠＠＠＠
＠＠＠＠　　　　　　　　＠＠＠＠＠＠＠　　　　　　　　＠＠＠＠＠＠＠　　　＠　　　＠＠＠＠＠＠＠＠＠　　　　　＠＠＠＠＠
＠＠＠＠　　　　　　　＠＠＠＠＠＠＠＠　　　　　　　＠＠＠＠＠＠＠＠　　　＠　　　　＠＠＠＠＠＠＠＠＠　　　　　＠＠＠＠
＠＠＠＠　　　　　　＠＠＠＠＠＠＠＠＠　　　　　　＠＠＠＠＠＠＠＠　　　　　　　　　＠＠＠＠＠＠＠＠＠＠＠　　　　＠＠＠
＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠　　　　　　　　　＠＠＠＠＠＠＠　　　＠　　　　＠＠＠
＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠　　　＠＠＠　　　　＠＠＠＠＠＠　　　　　　　＠＠＠＠
＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠　　　　＠＠＠＠　　　＠＠＠＠＠＠　　　　　　　＠＠＠＠
＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠　　　＠＠＠＠＠　　　＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠
＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠
＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠V0.99＠＠＠＠＠＠
＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠"
echo "[PPAS] Patient Profile Analysis System v0.99 (Demo)"
echo "[PPAS] Setting up..."

# Import all tables of 'patient' from MySQL to Hive
# Create Hive table if not exists
echo [PPAS] Creating Hive table...
hive -e "create database if not exists patient;"

echo "[PPAS] Importing necessary tables...... "
echo "[PPAS] Importing table 'Diagnosis'..."
sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Diagnosis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Diagnosis
echo "[PPAS] Importing table 'Diseases'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Diseases --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Diseases
echo "[PPAS] Importing table 'Diseases_relations'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Diseases_relations --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Diseases_relations
echo "[PPAS] Importing table 'Diseases_relations_combo...'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Diseases_relations_combo --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Diseases_relations_combo
echo "[PPAS] Importing table 'Diseases_statistics'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Diseases_statistics --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Diseases_statistics
echo "[PPAS] Importing table 'Health_basic_data'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Health_basic_data --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Health_basic_data
echo "[PPAS] Importing table 'Medical_event_brief_data'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Medical_event_brief_data --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Medical_event_brief_data
echo "[PPAS] Importing table 'Medical_expense_data'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Medical_expense_data --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Medical_expense_data
echo "[PPAS] Importing table 'Patient_basic_data'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patient_basic_data --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patient_basic_data
echo "[PPAS] Importing table 'Patients_clustering'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_clustering --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_clustering
echo "[PPAS] Importing table 'Patients_geocoord'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_geocoord --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_geocoord
echo "[PPAS] Importing table 'Patients_profile'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_profile --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_profile
echo "[PPAS] Importing table 'Patients_profile_tag'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_profile_tag --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_profile_tag
echo "[PPAS] Importing table 'Patients_statistics_ABObloodtype'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_ABObloodtype --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_ABObloodtype
echo "[PPAS] Importing table 'Patients_statistics_age'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_age --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_age
echo "[PPAS] Importing table 'Patients_statistics_allergyhis'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_allergyhis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_allergyhis
echo "[PPAS] Importing table 'Patients_statistics_expense'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_expense --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_expense
echo "[PPAS] Importing table 'Patients_statistics_familyhis'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_familyhis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_familyhis
echo "[PPAS] Importing table 'Patients_statistics_gender'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_gender --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_gender
echo "[PPAS] Importing table 'Patients_statistics_infdiseasehis'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_infdiseasehis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_infdiseasehis
echo "[PPAS] Importing table 'Patients_statistics_operationhis'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_operationhis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_operationhis
echo "[PPAS] Importing table 'Patients_statistics_Rhbloodtype'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_Rhbloodtype --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_Rhbloodtype
echo "[PPAS] Importing table 'Patients_statistics_transfusionhis'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_transfusionhis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_transfusionhis
echo "[PPAS] Importing table 'Patients_statistics_vacchis'..."
# sqoop import --connect jdbc:mysql://localhost:3306/patient --username root --password Iamthesudoer --table Patients_statistics_vacchis --fields-terminated-by '\t' --delete-target-dir --num-mappers 1 --hive-import --hive-database patient --hive-table Patients_statistics_vacchis

# Execute HiveQLs (Demo only)
echo "[PPAS] Executing HiveQLs... (Demo only)"
# echo "[PPAS] Executing HiveQL for /patients/statistics/expense..."
# hive -e "use patient; insert overwrite local directory '/home/ppas/PPAS/init/hive_results/expense_hive'
# row format delimited
# fields terminated by ','
# select id, healthcardnumber,
# (outpatientexpense/(outpatientexpense+inpatientexpense+personalexpense)) ,(inpatientexpense/(outpatientexpense+inpatientexpense+personalexpense)),(personalexpense/(outpatientexpense+inpatientexpense+personalexpense))
#  from medical_expense_data
#  group by id,healthcardnumber, outpatientexpense,inpatientexpense,personalexpense;
# "
# echo "[PPAS] Executing HiveQL for /patients/statistics/"
# echo "[PPAS] Executing HiveQL for /patients/statistics/gender..."
# hive -e "use patient; select gendercode ,count(*) as count from patient_basic_data group by gendercode" >> ~/PPAS/init/hive_results/1

# 医疗费用占比：
# insert overwrite directory 'expense_hive'
# row format delimited
# fields terminated by ','
# select healthcardnumber,
# (outpatientexpense/(outpatientexpense+inpatientexpense+personalexpense)) ,(inpatientexpense/(outpatientexpense+inpatientexpense+personalexpense)),(personalexpense/(outpatientexpense+inpatientexpense+personalexpense))
#  from medical_expense_data
#  group by healthcardnumber, outpatientexpense,inpatientexpense,personalexpense;
# 性别：
# insert overwrite directory 'gendercode_hive'
# row format delimited
# fields terminated by ','
# select gendercode ,count(*) as count from patient_basic_data group by gendercode ;
# 年龄段：//柱状图
# insert overwrite directory 'dateofbirth_hive'
# row format delimited
# fields terminated by ','
# select count(*),ceil(dateofbirth/10)*10 as min ,(ceil(dateofbirth/10)+1)*10  as max
# from patient_basic_data group by (ceil(dateofbirth/10));
# ABO血型：
# insert overwrite directory 'aboblood_hive'
# row format delimited
# fields terminated by ','
# select abobloodtypecode ,count(*) as count from health_basic_data group by abobloodtypecode;


# RH血型：
# insert overwrite directory 'aboblood_hive'
# row format delimited
# fields terminated by ','
# select abobloodtypecode ,count(*) as count from health_basic_data group by abobloodtypecode;
# 病史//不要用，全是字，没有办法分析
# insert overwrite directory ' diseasehistory_hive'
# row format delimited
# fields terminated by ','
# select diseasehistory ,count(*) as count from health_basic_data group by diseasehistory;

# 传染病史：
# insert overwrite directory ' infectiousdiseasehistory_hive'
# row format delimited
# fields terminated by ','
# select infectiousdiseasehistory ,count(*) as count from health_basic_data group by infectiousdiseasehistory;

# 接种史：
# insert overwrite directory ' vaccinationhistory_hive'
# row format delimited
# fields terminated by ','
# select vaccinationhistory ,count(*) as count from health_basic_data group by vaccinationhistory;


# 手术史：
# insert overwrite directory ' operationhistory_hive'
# row format delimited
# fields terminated by ','
# select operationhistory ,count(*) as count from health_basic_data group by operationhistory;

# 输血史//transfusionhistory
# insert overwrite directory ' transfusionhistory _hive'
# row format delimited
# fields terminated by ','
# select transfusionhistory ,count(*) as count from health_basic_data group by transfusionhistory;

# 过敏史
# insert overwrite directory ' allergyhistory_hive'
# row format delimited
# fields terminated by ','
# select allergyhistory ,count(*) as count from health_basic_data group by allergyhistory;

# 家族史：
# insert overwrite directory ' familyhistory _hive'
# row format delimited
# fields terminated by ','
# select familyhistory ,count(*) as count from health_basic_data group by familyhistory;


# Export HiveQL results to MySQL
echo "[PPAS] Exporting HiveQL results to MySQL..."
# mysql -uroot -pIamthesudoer -e """use patient; load data local infile '~/PPAS/init/hive_results/expense_hive/000000_0' into table Patients_statistics_expense fields terminated by ',';"""
# ...

# Execute algorithms
echo "Executing algorithms..."
# python3 /home/PPAS/init/alg/k-means.py
# python3 /home/PPAS/init/alg/apriori.py
# mysql -uroot -pIamthesudoer -e """use patient; load data local infile '/home/PPAS/init/alg/result.txt' into table Patients_clustering fields terminated by ';';"""

# Run PPAS server
echo "[PPAS] Starting PPAS Server..."
nohup java -jar ppas-v0.99.jar