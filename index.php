<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="jquery.min.js"></script>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css"  >
    <link rel="manifest" href="manifest.json">
    <title>Web push notifications</title>
</head>
<body>
<div class="row">
    <form class="col-md-8 col-md-offset-3 div-padding">
            <div class="col-md-12">
                <input type="text" class="form-control " name="description" title="">
            </div>
            <!-- берем из бд ид менеджера для данного работника и ложим сюда ?-->
            <input class="js-push-address" type="hidden" value="from DB">

            <div class="col-md-4 col-md-offset-2">
                <button type="submit" class="btn-primary btn-block"><i class=""></i>Request another </button>
            </div>
    </form>
</div>
<div class="row">
    <button class="btn js-subscribe-button" disabled>
        Enable Push Messages
    </button>
    <button type="button"  onclick="sendPushMess();" class="btn js-push-button" disabled>
        Send Push Message
    </button>
</div>

<script src="main.js"></script>
</body>
</html>

