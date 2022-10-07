export default function handlerInput(e, obj, act) {
	act({ ...obj, [e.target.name]: e.target.value });
}
