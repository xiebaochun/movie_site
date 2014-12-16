$(function  () {
	$('.del').click(function(e) {
		
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type: 'DELETE',
			url: '/admin/list?id=' + id
		})
		.done(function(results) {
			var con = confirm("Are you sure delete ?");
			if(con == true) { 
			    if (results.success === 1) {
	                if(tr.length > 0) {
	                	tr.remove();
	                }
				}	
			}
			else {

			}
			
		})
		.fail(function(e){
           alert(e);
		})
	})
})