import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'constant-arrival-rate',
		duration: '1h',
		timeUnit: '1s',
		rate: 10,
		preAllocatedVUs: 10,
		maxVUs: 25
	  },
	},
};

export default function () {
	let headers = {
		'app_user_name': 'Test_user',
		'Content-Type': 'application/json'
	};
	let body = {
		"Item": {
			"title": "Test title",
			"category": "Performance tests",
			"description": "Performance test on cloud",
		}
	};
	const res = http.post('https://notes-web-app.azurewebsites.net/api/note', JSON.stringify(body), { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}


