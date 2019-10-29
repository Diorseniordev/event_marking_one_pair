#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe

worker_db_fname = 'EM_completed_worker_log.txt'
# file format: tab-delimited text
# fields: worker id, timestamp of completion, completion code

import sys, cgi, cgitb, os.path,random

cgitb.enable(display=0, logdir="pylogs")

formdata = cgi.FieldStorage()

workerid     = formdata.getvalue("workerid",      "WORKERID_NULL")

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')

if (workerid == "WORKERID_NULL") or (workerid == ""):
    sys.stdout.write('error')
    sys.exit()

try:
    filehandle = open(worker_db_fname, 'r')
    all_lines = filehandle.readlines()
    filehandle.close()
except:
    sys.stdout.write('error')
    sys.exit()

condition_0_list = []
condition_1_list = []
condition_2_list = []
condition_3_list = []
condition_4_list = []
condition_5_list = []
condition_6_list = []
condition_7_list = []
condition_8_list = []
condition_9_list = []
condition_10_list = []
condition_11_list = []
condition_12_list = []
condition_13_list = []
condition_14_list = []
condition_15_list = []
condition_16_list = []
condition_17_list = []
condition_18_list = []
condition_19_list = []
condition_20_list = []
condition_21_list = []
condition_22_list = []
condition_23_list = []
condition_24_list = []
condition_25_list = []
condition_26_list = []
condition_27_list = []
condition_28_list = []
condition_29_list = []
condition_30_list = []
condition_31_list = []



for this_line in all_lines:
    this_line = this_line.strip( '\n' )
    this_line_cells = this_line.split( '\t' )
    this_condition = this_line_cells[-1]

    if this_condition == '0':
        condition_0_list.append(this_condition)
    elif this_condition == '1':
        condition_1_list.append(this_condition)
    elif this_condition == '2':
        condition_2_list.append(this_condition)
    elif this_condition == '3':
        condition_3_list.append(this_condition)
    elif this_condition == '4':
        condition_4_list.append(this_condition)
    elif this_condition == '5':
        condition_5_list.append(this_condition)
    elif this_condition == '6':
        condition_6_list.append(this_condition)
    elif this_condition == '7':
        condition_7_list.append(this_condition)
    elif this_condition == '8':
        condition_8_list.append(this_condition)
    elif this_condition == '9':
        condition_9_list.append(this_condition)
    elif this_condition == '10':
        condition_10_list.append(this_condition)
    elif this_condition == '11':
        condition_11_list.append(this_condition)
    elif this_condition == '12':
        condition_12_list.append(this_condition)
    elif this_condition == '13':
        condition_13_list.append(this_condition)
    elif this_condition == '14':
        condition_14_list.append(this_condition)
    elif this_condition == '15':
        condition_15_list.append(this_condition)
    elif this_condition == '16':
        condition_16_list.append(this_condition)
    elif this_condition == '17':
        condition_17_list.append(this_condition)
    elif this_condition == '18':
        condition_18_list.append(this_condition)
    elif this_condition == '19':
        condition_19_list.append(this_condition)
    elif this_condition == '20':
        condition_20_list.append(this_condition)
    elif this_condition == '21':
        condition_21_list.append(this_condition)
    elif this_condition == '22':
        condition_22_list.append(this_condition)
    elif this_condition == '23':
        condition_23_list.append(this_condition)
    elif this_condition == '24':
        condition_24_list.append(this_condition)
    elif this_condition == '25':
        condition_25_list.append(this_condition)
    elif this_condition == '26':
        condition_26_list.append(this_condition)
    elif this_condition == '27':
        condition_27_list.append(this_condition)
    elif this_condition == '28':
        condition_28_list.append(this_condition)
    elif this_condition == '29':
        condition_29_list.append(this_condition)
    elif this_condition == '30':
        condition_30_list.append(this_condition)
    elif this_condition == '31':
        condition_31_list.append(this_condition)
    elif this_condition == '32':
        condition_32_list.append(this_condition)



lengths = [len(condition_0_list),len(condition_1_list),len(condition_2_list),len(condition_3_list),len(condition_4_list),len(condition_5_list),len(condition_6_list),len(condition_7_list),len(condition_8_list),len(condition_9_list),len(condition_10_list),len(condition_11_list),len(condition_12_list),len(condition_13_list),len(condition_14_list),len(condition_15_list),len(condition_16_list),len(condition_17_list),len(condition_18_list),len(condition_19_list),len(condition_20_list),len(condition_21_list),len(condition_22_list),len(condition_23_list),len(condition_24_list),len(condition_25_list),len(condition_26_list),len(condition_27_list),len(condition_28_list),len(condition_29_list),len(condition_30_list),len(condition_31_list)]

possible_conditions = []
if len(condition_0_list)<=max(lengths) and len(condition_0_list)<5:
    possible_conditions.append('0')
if len(condition_1_list)<=max(lengths) and len(condition_1_list)<5:
    possible_conditions.append('1')
if len(condition_2_list)<=max(lengths) and len(condition_2_list)<5:
    possible_conditions.append('2')
if len(condition_3_list)<=max(lengths) and len(condition_3_list)<5:
    possible_conditions.append('3')
if len(condition_4_list)<=max(lengths) and len(condition_4_list)<5:
    possible_conditions.append('4')
if len(condition_5_list)<=max(lengths) and len(condition_5_list)<5:
    possible_conditions.append('5')
if len(condition_6_list)<=max(lengths) and len(condition_6_list)<5:
    possible_conditions.append('6')
if len(condition_7_list)<=max(lengths) and len(condition_7_list)<5:
    possible_conditions.append('7')
if len(condition_8_list)<=max(lengths) and len(condition_8_list)<5:
    possible_conditions.append('8')
if len(condition_9_list)<=max(lengths) and len(condition_9_list)<5:
    possible_conditions.append('9')
if len(condition_10_list)<=max(lengths) and len(condition_10_list)<5:
    possible_conditions.append('10')
if len(condition_11_list)<=max(lengths) and len(condition_11_list)<5:
    possible_conditions.append('11')
if len(condition_12_list)<=max(lengths) and len(condition_12_list)<5:
    possible_conditions.append('12')
if len(condition_13_list)<=max(lengths) and len(condition_13_list)<5:
    possible_conditions.append('13')
if len(condition_14_list)<=max(lengths) and len(condition_14_list)<5:
    possible_conditions.append('14')
if len(condition_15_list)<=max(lengths) and len(condition_15_list)<5:
    possible_conditions.append('15')
#
#if len(condition_16_list)<=max(lengths) and len(condition_16_list)<5:
#    possible_conditions.append('16')
#if len(condition_17_list)<=max(lengths) and len(condition_17_list)<5:
#    possible_conditions.append('17')
#if len(condition_18_list)<=max(lengths) and len(condition_18_list)<5:
#    possible_conditions.append('18')
#if len(condition_19_list)<=max(lengths) and len(condition_19_list)<5:
#    possible_conditions.append('19')
#if len(condition_20_list)<=max(lengths) and len(condition_20_list)<5:
#    possible_conditions.append('20')
#if len(condition_21_list)<=max(lengths) and len(condition_21_list)<5:
#    possible_conditions.append('21')
#if len(condition_22_list)<=max(lengths) and len(condition_22_list)<5:
#    possible_conditions.append('22')
#if len(condition_23_list)<=max(lengths) and len(condition_23_list)<5:
#    possible_conditions.append('23')
#if len(condition_24_list)<=max(lengths) and len(condition_24_list)<5:
#    possible_conditions.append('24')
#if len(condition_25_list)<=max(lengths) and len(condition_25_list)<5:
#    possible_conditions.append('25')
#if len(condition_26_list)<=max(lengths) and len(condition_26_list)<5:
#    possible_conditions.append('26')
#if len(condition_27_list)<=max(lengths) and len(condition_27_list)<5:
#    possible_conditions.append('27')
#if len(condition_28_list)<=max(lengths) and len(condition_28_list)<5:
#    possible_conditions.append('28')
#if len(condition_29_list)<=max(lengths) and len(condition_29_list)<5:
#    possible_conditions.append('29')
#if len(condition_30_list)<=max(lengths) and len(condition_30_list)<5:
#    possible_conditions.append('30')
#if len(condition_31_list)<=max(lengths) and len(condition_31_list)<5:
#    possible_conditions.append('31')


condition = random.choice(possible_conditions)


sys.stdout.write(condition)


#    if (workerid == this_workerid):
#        sys.stdout.write('used')
#        sys.exit()

#sys.stdout.write(bad_subject)
