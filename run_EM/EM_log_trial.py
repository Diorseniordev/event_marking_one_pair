#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe

output_fname = 'EM_trial_log_{0}.txt' #the placeholder will get filled with the worker ID


import sys, cgi, cgitb, datetime

cgitb.enable(display=0, logdir="pylogs")

formdata = cgi.FieldStorage()


workerid     = formdata.getvalue("workerid",      "WORKERID_NULL")
gender= formdata.getvalue("gender",   "GENDER_NULL")
age= formdata.getvalue("age",   "AGE_NULL")
win_resized  = formdata.getvalue("win_resized",   "WIN_RESIZE_NULL")
total_time = formdata.getvalue("total_time",   "TOTAL_TIME_NULL")
condition     = formdata.getvalue("condition",      "condition_NULL")
which_quarter    = formdata.getvalue("which_quarter",      "which_quarter_NULL")
motion_toward_me = formdata.getvalue("motion_toward_me","motion_toward_me_NULL")
match_side = formdata.getvalue("match_side","match_side_NULL")
overall_flip = formdata.getvalue("overall_flip","overall_flip_NULL")
response    = formdata.getvalue("response",      "response_NULL")
RT    = formdata.getvalue("RT",      "RT_NULL")
movieName     = formdata.getvalue("movieName",      "movieName_NULL")

walker_response    = formdata.getvalue("walker_response",      "WALKER_RESPONSE_NULL")
walker_response_rt = formdata.getvalue("walker_response_rt",      "WALKER_RESPONSE_RT_NULL")
current_face_trial     = formdata.getvalue("current_face_trial",      "FACE_TRIAL_NULL")
face_id     = formdata.getvalue("face_id",      "FACE_ID_NULL")
starting_angle= formdata.getvalue("starting_angle",      "STARTING_ANGLE_NULL")
selected_angle= formdata.getvalue("selected_angle",      "SELECTED_ANGLE_NULL")
random_offset= formdata.getvalue("random_offset",      "RANDOM_OFFSET_NULL")
starting_morph= formdata.getvalue("starting_morph",      "STARTING_MORPH_NULL")
selected_morph= formdata.getvalue("selected_morph",      "SELECTED_MORPH_NULL")
this_face_string = formdata.getvalue("this_face_string",      "FACE_STRING_NULL")

admitted_switching = formdata.getvalue("admitted_switching_windows",   "ADMITTED_SWITCHING_NULL")
summarize_instructions = formdata.getvalue("summarize_instructions",   "SUMMARIZE_INSTRUCTIONS_NULL")
clear_enough = formdata.getvalue("clear_enough",   "CLEAR_ENOUGH_NULL")
heard_of = formdata.getvalue("heard_of",   "HEARD_OF_NULL")
display_problems = formdata.getvalue("display_problems",   "DISPLAY_PROBLEMS_NULL")
how_well = formdata.getvalue("how_well",   "HOW_WELL_NULL")
decision_criterion = formdata.getvalue("decision_criterion",   "DECISION_CRITERION_NULL")
comp_code = formdata.getvalue("comp_code",   "COMP_CODE_NULL")

output_fname = output_fname.format(workerid)
timestamp_str = '{0}'.format( datetime.datetime.utcnow() )
filehandle = open(output_fname, 'a')
to_print = '{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}\t{10}\t{11}\t{12}\t{13}\t{14}\t{15}\t{16}\t{17}\t{18}\t{19}\t{20}\t\n'.format(workerid,gender,age,win_resized,total_time,condition,which_quarter,motion_toward_me,match_side,overall_flip,response,RT,movieName,admitted_switching,summarize_instructions,clear_enough,heard_of,display_problems,how_well,decision_criterion,comp_code)

filehandle.write( to_print )
filehandle.close()


sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')
sys.stdout.write('Done.')
