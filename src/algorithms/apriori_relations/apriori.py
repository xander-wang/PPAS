#
# Apriori Algorithm - A part of PPAS implementation
# Implements item set mining and association rule learning for PPAS.
# 
#
# Code written by Yuhui Wang on 17th April, 2018.
#
# Institute of Distributed Computing, Chuzhou University.

import mysql.connector
import random


# create_c_n()生成：
# c_n 候选n项集

# scan()生成：
# re_list 也就是 L_n 为频繁n项集，
# support_data 为频繁n项集的支持度

# 重复


def connect():
    con = mysql.connector.connect(user='root', password='Iamthesudoer', host='210.45.165.155')
    cursor = con.cursor()
    cursor.execute("use patient;")
    cursor.execute(u"SELECT Medical_event_brief_data.MWMDiagnosisCode FROM Medical_event_brief_data")
    result = cursor.fetchall()
    cursor.close()
    DATA = []
    for i in range(len(result)):
        DATA.append(str(result[i][0]).split(',')[:-1])
    return DATA


def create_c_1(data):  # 生成 候选1项集
    c_1 = []
    for x in data:
        for y in x:
            if not [y] in c_1:
                c_1.append([y])
    c_1.sort()
    c_1 = map(frozenset, c_1)
    return c_1
    # c_1:[{1}, {2}, {3}, {4}, {5}]


def create_c_n(L_n, i):  # 根据上一级的（频繁n-1项集 L_n）， 来生成本级的（候选n项集 c_n）
    c_n = []
    len_L_n = len(L_n)
    for x in range(len_L_n):
        for y in range(x + 1, len_L_n):
            # 前 i - 2 项相同时合并两个集合
            L1 = list(L_n[x])[:i - 2]
            L2 = list(L_n[y])[:i - 2]
            L1.sort()
            L2.sort()
            # 前 i - 2 项相同时合并两个集合
            if L1 == L2:
                c_n.append(L_n[x] | L_n[y])
    c_n = map(frozenset, c_n)
    return c_n


def scan(data, c_n, min_support):
    # 根据（原始数据 data）和（候选n项集 c_n）来计算c_n内各项的（支持度 support）并筛选出大于（最小支持度 min_support）的项
    # 生成（频繁n项集 re_list）和（频繁n项集的支持度 support_data）
    Dict = {}
    c_n_list = list(c_n)
    for Set in data:
        for item in c_n_list:
            if item.issubset(Set):
                if item not in Dict:
                    Dict[item] = 1
                else:
                    Dict[item] += 1
    # Dict 统计集合内各元素出现的次数 :
    num_items = float(len(data))
    re_list = []
    support_data = {}
    for key in Dict:
        support = Dict[key] / num_items
        if support >= min_support:
            re_list.insert(0, key)  # 去掉小于最小支持度的项之后的其他项的 频繁n项集
        support_data[key] = support
    return re_list, support_data
    # support_data 统计集合内各元素的支持度


def apriori(data, min_support):
    c_1 = create_c_1(data)  # 生成 候选1项集
    L_1, support_data = scan(data, c_1, min_support)  # 生成 频繁1项集 和 频繁1项集的支持度
    L = [L_1]
    i = 2
    # 若两个项集的长度为 i-1，则必须前 i-2 项相同才可连接，即求并集。所以[:i - 2]的实际作用为取列表的前 i-1 个元素
    while len(L[i - 2]) > 0:
        c_n = create_c_n(L[i - 2], i)  # 生成 候选n项集
        L_n, new_support_data = scan(data, c_n, min_support)  # 生成频繁n项集 和 频繁n项集的支持度

        support_data.update(new_support_data)
        # 将 频繁n项集的支持度 添加进 频繁项集支持度字典
        L.append(L_n)
        # 将 频繁n项集 追加进先前的频繁项集集合内
        i += 1
    return L, support_data


def rules_from_conseq(freq_set, H, supportData, big_rules_list, min_confident=0.7):  # 根据当前候选规则集 H 来生成下一层候选规则集合
    m = len(H[0])  # m:1, 2
    if len(freq_set) > (m + 1):
        Hmp1 = create_c_n(H, m + 1)  # 根据{2}, {3}, {5}来生成{2，3}, {2，5}, {3，5}
        Hmp1 = calc_conf(freq_set, Hmp1, supportData, big_rules_list, min_confident)
        if len(Hmp1) > 1:
            rules_from_conseq(freq_set, Hmp1, supportData, big_rules_list, min_confident)  # 递归


def calc_conf(freq_set, H, supportData, big_rules_list, min_confident=0.7):  # 计算规则的置信度并过滤
    prunedH = []  # 已被剪枝了的
    fp2 = open('relations_result.txt', 'a')

    for conseq in H:
        confident = supportData[freq_set] / supportData[freq_set - conseq]
        if confident >= min_confident:
            if len(list(freq_set - conseq)) == 1 and len(list(conseq)) == 1:
                fp2.write(str(list(freq_set - conseq)).replace('\'', '').replace('[', '').replace(']', '').replace(' ', ''))
                fp2.write(';')
                fp2.write(str(list(conseq)).replace('\'', '').replace('[', '').replace(']', '').replace(' ', ''))
                fp2.write('\n')
            big_rules_list.append((freq_set - conseq, conseq, confident))  # 追加记录关联规则及其置信度
            prunedH.append(conseq)  # 用于函数rules_from_conseq()中将三个及其以上元素的集合拆分为多个含有两个元素的集合来递归解决
    return prunedH  # 保存规则列表右部，将在下一个函数rules_from_conseq()中用到


def generate_rules(L, supportData, min_confident=0.7):  # 挖掘关联规则的主函数
    big_rules_list = []  # 包含置信度的规则列表，方便后续基于置信度对其进行排序
    for i in range(1, len(L)):  # i: 1, 2, 3
        for freq_set in L[i]:  # freq_set:frozenset({1, 3}), frozenset({2, 5}), frozenset({2, 3}), frozenset({3, 5})
            H1 = [frozenset([item]) for item in freq_set]  # item : {1}, {3};   Hl:[frozenset({1}), frozenset({3})]
            if i > 1:
                # 三个及其以上元素的集合
                H1 = calc_conf(freq_set, H1, supportData, big_rules_list, min_confident)
                rules_from_conseq(freq_set, H1, supportData, big_rules_list, min_confident)
            else:
                # 两个元素的集合
                calc_conf(freq_set, H1, supportData, big_rules_list, min_confident)
    return big_rules_list


if __name__ == "__main__":
    exp_list = connect()
    L, support_data = apriori(exp_list, min_support=0)
    rules = generate_rules(L, support_data, min_confident=0)

    fp = open('test.txt', 'a')
    count = 1
    for i in range(len(L)):
        s = str(list(random.choice(L[i]))).replace('\'', '').replace('[', '').replace(']', '').replace(' ', '')
        fp.write(str(count))
        fp.write(';')
        fp.write(s)
        fp.write(';')
        fp.write('\n')
        count = count + 1
