function Position(){
	this.loadHeader();
	this.addListener();
	this.check();
	this.page();
}

$.extend(Position.prototype, {
	//判断用户是否登录,如果未登录,则跳转到首页
	check:function(){
		$.get("/api/users/check",(data)=>{
			if(data.res_code === -1){
				location = "/index.html";
			}else{
				this.listByPage(1);
			}
		},"json")
	},
	loadHeader : function(){
		// 创建头部对象，加载DOM结构
		new Header();
		// 让“职位管理”导航选中
		$("#position-nav ul:first li:last").addClass("active").siblings().removeClass("active");
	},
	addListener:function(){
		$(".btn_add_pos").on("click", this.handleAddPosition);
		const that = this;
		$(".pagination").on("click","li",function(){
			let currentPage = 0;
			if($(this).attr("id") !=="prev" && $(this).attr("id") !=="next"){
				currentPage = $(this).find("a").text();
				$(this).addClass("active").siblings().removeClass("active");
			}
			//向前翻页
			if($(this).attr("id")==="prev"){
				let prevPage = $(this).parent().find(".active a").text();
				if(prevPage>1){
					$(this).parent().find(".active").removeClass("active").prev("li").addClass("active");
					prevPage --;
				}
				currentPage = prevPage;
			}
			//向后翻页
			if($(this).attr("id")==="next"){
				let len=$(".pagination li").length-2;
				let nextPage = $(this).parent().find(".active a").text();
				if(nextPage<len){
					$(this).parent().find(".active").removeClass("active").next("li").addClass("active");
					nextPage ++;
				}
				currentPage = nextPage;
			}
			that.listByPage(currentPage);
		});
		//修改
		$("tbody").on("click",".update",function(){
			let currentId = $(this).parents("tr").data("id");
			that.findById(currentId);
		});
		$(".btn_update_pos").on("click", that.update);
		//删除
		$("tbody").on("click",".del",function(){
			let id = $(this).parents("tr").data("id");
			that.delete(id);
		});
	},
	handleAddPosition : function() {
		var formData = new FormData($(".add_pos_form").get(0));
		$.ajax({
			type:"post",
			url:"/api/positions/add",
			data:formData,
			processData:false,
			contentType:false,
			dataType:"json",
			success:function(data){
				if(data.res_code === 0){
					$("#addPosModal").modal("hide");
				}else{
					$(".add_pos_error").removeClass("hide");
				}
			}
		});
		/*$.post("/api/positions/add", $(".add_pos_form").serialize(), function(data){
			if (data.res_code === 0) { 
				$("#addPosModal").modal("hide");
			} else { 
				$(".add_pos_error").removeClass("hide");
			}
		}, "json");*/
	},
	listByPage:function(currentPage){
		currentPage = currentPage || 1;
		$.get("/api/positions/list",{pageIndex:currentPage},function(data){
			if(data.res_code === 0){
				const html = template("position_list_temp",{list:data.res_body});
				$(".pos_tab tbody").html(html);
			}
		},"json");
	},
	findById:function(currentId){
		$.get("/api/positions/findById",{currentId:currentId},function(data){
			if(data.res_code === 0){
				$("#updatePosId").val(data.res_body[0]._id);
				$("#updatePosLogo").val(data.res_body[0].logo);
				$("#updatePosName").val(data.res_body[0].position);
				$("#updatePosCompany").val(data.res_body[0].company);
				$("#updatePosExperience").val(data.res_body[0].experience);
				$("#updatePosType").val(data.res_body[0].type);
				$("#updatePosSite").val(data.res_body[0].site);
				$("#updatePosSalary").val(data.res_body[0].salary);
			}
		},"json");
	},
	update:function(){
		$.post("/api/positions/update",$(".update_pos_form").serialize(),function(data){
			if (data.res_code === 0) { 
				$("#UpdatePosModal").modal("hide");
			} else { 
				$(".update_pos_error").removeClass("hide");
			}
		}, "json");
	},	
	delete:function(id){
		$.post("/api/positions/delete",{id:id},function(data){
			if (data.res_code === 0) { 
				location.reload();
			} 
		}, "json");
	},
	page:function(){
		$.get("/api/positions/page",function(data){
			if (data.res_code === 0) { 
				let page = Math.ceil(data.res_body/5);
				if(page>1){
					let html = `<li id="prev"><span>&laquo;</span></li>`;
					for(let i=0;i<page;i++){
						html += `<li ${i===0?'class="active"':""}><a href="#">${i+1}</a></li>`
					}
					html += `<li id="next"><span>&raquo;</span></li>`;
					$(".pagination").html(html);
				}
			} 
		}, "json");
	}
});

new Position();