<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="/public/css/news.css">
</head>
<body>
	<ul class="news">
		{% for item in list %}
			<li class="item">
				<a href="{{ item.url }}">{{ item.title }}</a>
			</li>
		{% endfor %}
	</ul>
</body>
</html>