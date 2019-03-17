$(document).ready(function(){
	$("#doctor_registration").validate({
		errorClass: 'errors',

		rules: {
			first_name: "required",
			last_name: {
				required: true
			}
		},

		messages: {
			first_name: "Please enter the first name",
			last_name: {
				required: "Please enter the last name"
			}
		}
	});
});