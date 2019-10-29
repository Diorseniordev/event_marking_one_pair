#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe

demogrpahics_db_fname = 'EM_demographics_log.txt'
# file format: tab-delimited text
# fields: worker id, timestamp of logging, race, ethnicity, gender, age
lockfile_fname  = 'EM_demographics_log_lockfile' #doing this the ghetto way for now

import sys, cgi, cgitb, datetime, os.path, time

cgitb.enable(display=0, logdir="pylogs")

formdata = cgi.FieldStorage()

workerid     = formdata.getvalue("workerid",      "WORKERID_NULL")
race         = formdata.getvalue("race",          "RACE_NULL")
ethnicity    = formdata.getvalue("ethnicity",     "ETHNICITY_NULL")
gender       = formdata.getvalue("gender",        "GENDER_NULL")
age          = formdata.getvalue("age",           "AGE_NULL")
uas          = formdata.getvalue("uas",           "UAS_NULL")

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')

timestamp_str = '{0}'.format( datetime.datetime.utcnow() )
line_to_print = '{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\n'.format( workerid, timestamp_str, race, ethnicity, gender, age, uas )

#check lock status
try_count = 0
lockfile_exists = os.path.isfile( lockfile_fname )
while lockfile_exists:
    time.sleep(0.2)
    try_count += 1
    if try_count > 10:
        sys.stdout.write('error')
        sys.exit()
    lockfile_exists = os.path.isfile( lockfile_fname )

open(lockfile_fname, 'a').close() #creates lockfile and immediately closes it

try:
    filehandle = open(demogrpahics_db_fname, 'a')
    filehandle.write(line_to_print)
    filehandle.close()
    os.remove(lockfile_fname)
except:
    sys.stdout.write('error')
    os.remove(lockfile_fname)
    filehandle.close()
    sys.exit()

if (workerid == "WORKERID_NULL") or (workerid == ""):
    sys.stdout.write('error')
else:
    sys.stdout.write('success')
