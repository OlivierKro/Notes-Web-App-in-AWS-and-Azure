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
			{ target: 150, duration: '25s' },
			{ target: 150, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 150, duration: '25s' },
			{ target: 150, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 150, duration: '25s' },
			{ target: 150, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 150, duration: '25s' },
			{ target: 150, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 150, duration: '25s' },
			{ target: 150, duration: '10s' },
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
	const res = http.get('https://notes-web-app.azurewebsites.net/api/notes', { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}