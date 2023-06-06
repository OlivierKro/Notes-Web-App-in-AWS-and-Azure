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
			{ target: 100, duration: '25s' },
			{ target: 100, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 100, duration: '25s' },
			{ target: 100, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 100, duration: '25s' },
			{ target: 100, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 100, duration: '25s' },
			{ target: 100, duration: '10s' },
			{ target: 0, duration: '25s' },
			{ target: 0, duration: '4m' },

			{ target: 100, duration: '25s' },
			{ target: 100, duration: '10s' },
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
	const res = http.get('https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod/notes', { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}