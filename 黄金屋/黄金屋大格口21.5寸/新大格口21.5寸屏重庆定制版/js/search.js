function search_getBookList() {
	var a = createAjaxURL(interface_name.method_book_list_search_for_shelf),
		d = {
			bookshelfId: public_getBookShelfId(),
			keyword: document.getElementById("inputBookSearch").innerText.trim()
		};		
	util.ajax.getJSON(a, d, function(a) {
		var f = document,
			g = f.getElementById("divBookSearchList");
		a = a.list;
		var c, b;
		g.innerHTML = "";
		for(var e = 0, d = a.length; e < d; e++) c = a[e], b = f.createElement("div"), b.className = "tappable-scroll", b.dataset.action = "bookDetail", b.dataset.id = c.bookId, b.innerHTML =
			'<img src="images/book_cover.png" class="bkpic" data-src="' + global_imgURL + c.bookPic + '" onload="load(this)" /><ul class="bklt"><li><p class="bkname">\u300a' + c.bookName + "\u300b</p></li><li><p>\u4f5c\u8005\uff1a" + c.bookAuthor + "</p></li></ul>", g.appendChild(b);
		$(".tappable-scroll").off("tap");
		$(".tappable-scroll").on("tap", function() {
			tapHandler($(this),null);
		})
	})
}
function search_list_init() {
	document.getElementById("inputBookSearch").innerHTML = "";
	document.getElementById("divBookSearchList").innerHTML = "";
	document.getElementById("inputBookSearch").blur()
};