module.exports = {
    callWaiterNotificationTitle : "Waiter Request",
    callWaiterNotificationBody : "The user %s %s in the table %d requests a waiter",
    billRequestNotificationTitle : "Bill Request",
    billRequestNotificationBody : "The user %s %s in the table %d requests their bill",
    sendBillNotificationTitle : "Bill",
    sendBillRequestNotificationBody : "Your bill is %s %d",
    splitRequestNotificationTitle : "Split Payment Request",
    splitRequestNotificationBody : "Your friend %s %s would like split the payment with you. The amount is %s %d",
    splitResponseNotificationTitle : "Split Payment Response",
    positiveSplitResponseNotificationBody : "Your friend %s %s accepted to split the payment with you",
    negativeSplitResponseNotificationBody : "Your friend %s %s refused to split the payment with you",
    emailBillBody : 
        "<div style='border-style: solid; border-color: #BAD230; border-radius: 5px; display: block;'>" +
            "<div style='background-color: #BAD230; display: inline-block; width: 100%;'>" +
                "<h1 style='color: white; text-align: center;'>Ugwo Bill</h1>" +
            "</div>"+
            "<div>"+
                "<p style='font-size:20px; text-align:center;'>Gracias por elegir Ugwo, %s %s</p>" +
                "<table style='width: 100%; border-collapse: collapse;'>" +
                    "<tbody>" +
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                            "<td style='border-bottom: 1px solid #ddd;'>Restaurante</td>" +
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s</td>"+
                        "</tr>" +
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                            "<td style='border-bottom: 1px solid #ddd;'>Tarifa</td>" +
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s%d</td>" +
                        "</tr>" +
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                            "<td style='border-bottom: 1px solid #ddd;'>Tarjeta</td>" +
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s</td>" +
                        "</tr>" +
                    "</tbody>" +
                "</table>" +
            "</div>" +
        "</div>",
    emailCommerceBillBody :
        "<div style='border-style: solid; border-color: #BAD230; border-radius: 5px; display: block;'>" +
            "<div style='background-color: #BAD230; display: inline-block; width: 100%;'>" +
                "<h1 style='color: white; text-align: center;'>Ugwo Bill</h1>" +
            "</div>" +
            "<div>" +
                "<p style='font-size:20px; text-align:center;'>Gracias por elegir Ugwo, %s</p>"+
                "<table style='width: 100%; border-collapse: collapse;'>"+
                    "<tbody>"+
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'> " +
                            "<td style='border-bottom: 1px solid #ddd;'>Cliente</td>" +
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s %s</td>" +
                        "</tr>"+
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                            "<td style='border-bottom: 1px solid #ddd;'>Fecha</td>" +
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s</td>" +
                        "</tr>"+
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>"+
                            "<td style='border-bottom: 1px solid #ddd;'>Tarifa</td>"+
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s %d</td>"+
                        "</tr>"+
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                            "<td style='border-bottom: 1px solid #ddd;'>Mesa</td>" +
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%d</td>" +
                        "</tr>"+
                        "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'> " +
                            "<td style='border-bottom: 1px solid #ddd;'>Empleado</td>"+
                            "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s %s</td> " +
                        "</tr>" +
                    "</tbody>" +
                "</table>" +
            "</div>"+
        "</div>",
        emailCommerceBillNoEmployeeBody :
            "<div style='border-style: solid; border-color: #BAD230; border-radius: 5px; display: block;'>" +
                "<div style='background-color: #BAD230; display: inline-block; width: 100%;'>" +
                    "<h1 style='color: white; text-align: center;'>Ugwo Bill</h1>" +
                "</div>" +
                "<div>" +
                    "<p style='font-size:20px; text-align:center;'>Gracias por elegir Ugwo, %s</p>"+
                    "<table style='width: 100%; border-collapse: collapse;'>"+
                        "<tbody>"+
                            "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'> " +
                                "<td style='border-bottom: 1px solid #ddd;'>Cliente</td>" +
                                "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s %s</td>" +
                            "</tr>"+
                            "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                                "<td style='border-bottom: 1px solid #ddd;'>Fecha</td>" +
                                "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s</td>" +
                            "</tr>"+
                            "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>"+
                                "<td style='border-bottom: 1px solid #ddd;'>Tarifa</td>"+
                                "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%s %d</td>"+
                            "</tr>"+
                            "<tr style='height: 50px; border-bottom: 1px solid #ddd;font-size: 20px;'>" +
                                "<td style='border-bottom: 1px solid #ddd;'>Mesa</td>" +
                                "<td style='border-bottom: 1px solid #ddd; text-align:center;'>%d</td>" +
                            "</tr>"+
                        "</tbody>" +
                    "</table>" +
                "</div>"+
            "</div>",
    emailPasswordReset :
        "<div style='border-style: solid; border-color: #BAD230; border-radius: 5px; display: block;'>" +
            "<div style='background-color: #BAD230; display: inline-block; width: 100%;'> " +
                "<h1 style='color: white; text-align: center;'>Ugwo Password</h1>" +
            "</div>" +
            "<div style='font-size:20px;'>" +
                "<div  style='padding:10px;'>" +
                    "<p> Buenas %s %s </p>" +
                    "<p>" +
                        "Hemos recibido una solicitud para resetear tu contaseña. Ingresa al siguiente link para escoger una nueva contraseña." +
                    "</p>" +
                    "<p>" +
                        "Cambia tu password <a href='%s'>aquí</a>" +
                    "</p>" +
                "</div>" +
            "</div>"+
        "</div>"
};