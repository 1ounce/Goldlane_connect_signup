

$("#pass").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btn").click();
    }
    });
	
		$("#phn").focusin(function() {
    	//$("#err").hide();
    	$("#valid_phn_no").css("display","none")

    })
	

		$("#pass").focusin(function() {
    	//$("#err").hide();
    	$("#err").css("display","none")

    })

	
	


		$("#pass").focusin(function() {
           $("#sucess").css("display","none")
    	})
	

	
		$("#phn").focusout(function() {
			 var pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
			var phnno = $("#phn").val();
			if(!pattern.test(phnno)){
				$("#valid_phn_no").show();
				
			} else {
				$("#valid_phn_no").hide();
			}

		})


		function checkpass() {
		$('#load_icon').addClass('spinner-border text-light');
		let phn = document.getElementById("phn").value;
		let pass = document.getElementById("pass").value;

		$.post(`${connect_ip}login/`, { username:phn,password:pass } ,function(data,status){

			 if(status=="success") {
			 	$('#load_icon').removeClass('spinner-border text-light');
			 	 $("#sucess").css("display","block")
			 	 //alert("Success")
			 }


		}).fail(function(data) {
			if(data.status==500) {
			  $('#load_icon').removeClass('spinner-border text-light');
              $("#err").css("display","block")
              
			}
		})
	}