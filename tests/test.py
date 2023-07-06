import sys
import os
import shutil
import time

##		sys.arg[1]	-->		name of cloud
##		sys.arg[2]	-->		way of implementation
##		sys.arg[3]	-->		architecture number
##		sys.arg[4]	-->		test type
##		sys.arg[5]	-->		number of tests
##		sys.arg[6]	-->		time interval between tests [s]
##		sys.arg[7]	-->		test time
##		sys.arg[8]	-->		rate in test
##		sys.arg[9]	-->		file name


def test(path: str, test_number: int, test_type: str):
	print("-----------------------------------------------------------------------")
	print(f"                                Test #{test_number}")
	print("-----------------------------------------------------------------------")

	test_path = os.path.join(path, f"test_#{test_number}")
	if not os.path.exists(test_path):
		os.makedirs(test_path)
	summary_path = os.path.join(test_path, 'summary_test.json')
	results_path = os.path.join(test_path, 'results_test.json')

	command = fr"k6 run --summary-export={summary_path} --out json={results_path} {filename}"
	os.system(command)

	print("-----------------------------------------------------------------------")
	print(f"                           Test #{test_number} completed")
	print("-----------------------------------------------------------------------")	


if __name__ == "__main__":
	cloud = sys.argv[1]
	implementation = sys.argv[2]
	architecture = int(sys.argv[3])
	test_type = sys.argv[4]
	number_of_tests = int(sys.argv[5])
	interval_time = int(sys.argv[6])
	test_time = sys.argv[7]
	rate = sys.argv[8]
	filename = sys.argv[9]

	test_title = f'POST-{number_of_tests}-{interval_time}-{test_time}-{rate}r'
	print(f"Folder:		{cloud}-{implementation}-{architecture}")
	print(f"Test:		{test_title}")
	print(f"Plik:		{filename}")
	print("---------------")

	main_path = os.getcwd()
	architecture_path = os.path.join(main_path, f"{cloud}-{implementation}-{architecture}")
	if not os.path.exists(architecture_path):
		os.makedirs(architecture_path)
	test_type_path = os.path.join(architecture_path, f"{test_type}_test")
	if not os.path.exists(test_type_path):
		os.makedirs(test_type_path)
	path = os.path.join(test_type_path, f"{test_title}")
	if not os.path.exists(path):
		os.makedirs(path)

	for i in range(1, number_of_tests + 1):
		test(path = path, test_number = i, test_type=test_type)
		if i != number_of_tests:
			time.sleep(interval_time)

	shutil.copyfile(f"{test_type}.js", f"{path}\{test_type}_backup.js")
	print("-----------------------------------------------------------------------")
	print("                            Tests completed                            ")
	print("-----------------------------------------------------------------------")


