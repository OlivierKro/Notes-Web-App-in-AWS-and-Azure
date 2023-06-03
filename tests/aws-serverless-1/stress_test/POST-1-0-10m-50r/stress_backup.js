import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'constant-arrival-rate',
		duration: '10m',
		timeUnit: '1s',
		rate: 50,
		preAllocatedVUs: 50,
		maxVUs: 100
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
	const res = http.post('https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod/note', JSON.stringify(body), { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}