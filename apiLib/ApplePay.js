var payture = new (require('./paytureCommon')).PaytureCommon();

exports.PaytureAppleApi = function PaytureAppleApi(host, merchantKey){
    if(host === undefined)
        this.Host = 'https://sandbox.payture.com';
    else 
        this.Host = host;
    
    this.ApiType = 'api';

    if(merchant !== undefined){
        this.Merchant = merchantKey;
    }

    this.Response = undefined;


    this.pay = function pay(data, callbackFunc){
        this.Method = 'PAY';
        appleRequest(this, data, callbackFunc);
    };

    this.block = function block(data, callbackFunc){
        this.Method = 'BLOCK';
        appleRequest(this, data, callbackFunc);

    };

     function appleRequest(obj, data, callbackFunc){
        payture.sendRequest(obj, payture.COMMANDS.APPLEPAY, 'POST', [
                        {
                            name: 'PayToken',
                            value: data.PayToken
                        },
                        {
                            name: 'Key',
                            value: obj.Merchant,
                        },
                                                {
                            name: 'Method',
                            value: obj.Method
                        },
                        {
                            name: 'OrderId',
                            value: data.OrderId,
                        },
                        
                    ], callbackFunc);
    };
    return this;
}

