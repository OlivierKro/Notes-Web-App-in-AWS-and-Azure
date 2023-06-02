import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'ramping-arrival-rate',
		startRate: 0,
		timeUnit: '1s',
		preAllocatedVUs: 0,
		maxVUs: 1000,
		stages: [
			{ target: 175, duration: '25s' },
			{ target: 175, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 175, duration: '25s' },
			{ target: 175, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 175, duration: '25s' },
			{ target: 175, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 175, duration: '25s' },
			{ target: 175, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 175, duration: '25s' },
			{ target: 175, duration: '10s' },
			{ target: 0, duration: '25s' },
		]
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
			"category": "Stress tests",
			"description": "Stress test on cloud",
		}
	};
	const res = http.post('https://notes-web-app.azurewebsites.net/api/note', JSON.stringify(body), { headers: headers });
 	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}