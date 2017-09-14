module.exports = {
    callWaiterNotificationTitle : "Solicitud de mesero",
    callWaiterNotificationBody : "El usuario %s %s en la mesa %d solicita un mesero",
    billRequestNotificationTitle : "Solicitud de cuenta",
    billRequestNotificationBody : "El usuario %s %s en la mesa %d solicita su cuenta",
    sendBillNotificationTitle : "Envió de cuenta",
    sendBillRequestNotificationBody : "Tu cuenta es de %s %s",
    splitRequestNotificationTitle : "Solicitud de divisón de pago",
    splitRequestNotificationBody : "Tu amigo %s %s desea dividir el pago contigo por un monto de %s %d",
    splitResponseNotificationTitle : "Respuesta de divisón de pago",
    positiveSplitResponseNotificationBody : "Tú amigo %s %s aceptó dividir la cuenta contigo",
    negativeSplitResponseNotificationBody : "Tú amigo %s %s rechazó dividir la cuenta contigo",
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
