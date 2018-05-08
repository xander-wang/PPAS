#
# KMeans_result_formatter - A part of PPAS implementation
# Clustering algorithm that handles vector quantization for PPAS.
#
# Code written by Yuhui Wang on 16th April, 2018.
#
# Institute of Distributed Computing, Chuzhou University.

file = open("result", 'r')
for line in file.readlines():
    res = line[:-1]

print(res)
