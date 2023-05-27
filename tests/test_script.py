import sys
import os
import shutil
import time

##		sys.arg[1]	-->		name of cloud
##		sys.arg[2]	-->		way of implementation
##		sys.arg[3]	-->		architecture number
##		sys.arg[4]	-->		test type
##		sys.arg[5]	-->		test title
##		sys.arg[6]	-->		number of tests
##		sys.arg[7]	-->		time interval between tests [s]

def test(path: str, test_number: int):
	print("-----------------------------------------------------------------------")
	print(f"                                Test #{test_number}                                ")
	print("-----------------------------------------------------------------------")

	results_path = fr"{path}\test_#{test_number}"
	if not os.path.exists(results_path):
		os.makedirs(results_path)

	command = fr"k6 run --summary-export={results_path}\summary_test.json --out json={results_path}\results_test.json stress.js"
	os.system(command)


if __name__ == "__main__":
	cloud = 'azure'
	implementation = 'serverless'
	architecture = 1
	test_type = 'stress'
	test_title = 'test'
	number_of_tests = 4
	interval_time = 10
#	cloud = sys.argv[1]
#	implementation = sys.argv[2]
#	architecture = sys.argv[3]
#	test_type = sys.argv[4]
#	test_title = sys.arg[5]
#	number_of_tests = sys.arg[6]
#	interval_time = sys.arg[7]

	main_path = os.getcwd()
	path = f"{main_path}\{cloud}-{implementation}-{architecture}\{test_type}_test\{test_title}"
	
	if not os.path.exists(path):
		os.makedirs(path)

	for i in range(1, number_of_tests + 1):
		test(path = path, test_number = i)
		if i != number_of_tests:
			time.sleep(interval_time)

	shutil.copyfile(f"{test_type}.js", f"{path}\{test_type}_backup.js")

	print("-----------------------------------------------------------------------")
	print("                            Tests completed                            ")
	print("-----------------------------------------------------------------------")

