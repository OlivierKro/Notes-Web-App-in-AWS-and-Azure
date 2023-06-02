import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		exec: 'getNotes',
		executor: 'ramping-arrival-rate',
		startRate: 0,
		timeUnit: '1s',
		preAllocatedVUs: 0,
		maxVUs: 1000,
		stages: [
			{ target: 50, duration: '25s' },
			{ target: 50, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 50, duration: '25s' },
			{ target: 50, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 50, duration: '25s' },
			{ target: 50, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 50, duration: '25s' },
			{ target: 50, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 50, duration: '25s' },
			{ target: 50, duration: '10s' },
			{ target: 0, duration: '25s' },
		]
	  },
	},
};

export function getNotes () {
	let headers = {
		'app_user_name': 'Test_user',
		'Content-Type': 'application/json'
	};
	const res = http.get('https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod/notes', { headers: headers });
//	const res = http.get('https://notes-web-app.azurewebsites.net/api/notes', { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}

export function addNote () {
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
	const res = http.post('https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod/note', JSON.stringify(body), { headers: headers });
//	const res = http.post('https://notes-web-app.azurewebsites.net/api/note', JSON.stringify(body), { headers: headers });
 	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}