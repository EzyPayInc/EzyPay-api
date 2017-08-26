/**
 * Created by dfonseca on 15/11/16.
 */
module.exports = {
    GCloudStorage: require('./service.gcloud.storage'),
    CardService: require('./service.card'),
    ClientService: require('./service.client'),
    RestaurantService: require('./service.restaurant'),
    TableService: require('./service.table'),
    UserService: require('./service.user'),
    TicketService: require('./service.ticket'),
    PaymentService: require('./service.payment'),
    CurrencyService: require('./service.currency'),
    PushNotificationsService: require('./service.pushnotifications'),
    DeviceTokenService: require('./service.devicetoken'),
    UserPaymentService: require('./service.userpayment'),
    BankAccountService: require('./service.bankaccount'),
    CountryService: require('./service.country')
};