$.ajax({
	url : 'php/getUser.php', // your php file
	type : 'GET', // type of the HTTP request
	cache: false,
	success : function(data){
		var obj = data.split('\\');
		var userName = obj[1];
		processUser(userName);
		$.ajax({
			url : 'php/getUsersData.php', // your php file
			type : 'GET', // type of the HTTP request
			cache: false,
			success : function(data){
			   var obj = jQuery.parseJSON(data);
			   processUsers(obj);
			   $.ajax({
					url : 'php/getDept.php', // your php file
					type : 'GET', // type of the HTTP request
					cache: false,
					success : function(data){
						var obj = jQuery.parseJSON(data);
						processDept(obj);
						$.ajax({
							url : 'php/getData.php', // your php file
							type : 'GET', // type of the HTTP request
							cache: false,
							success : function(data){
							   var obj = jQuery.parseJSON(data);
							   processData(obj);
							   $.ajax({
									url : 'PromotionEligibility/Eligibility_list/Elibility.json', // your php file
									type : 'GET', // type of the HTTP request
									dataType : 'json',
    								async: true,
									cache: false,
									success : function(data){
										processDataList(data);
									}
								});
							}
						});
					}
				});
			}
		});
	}
});