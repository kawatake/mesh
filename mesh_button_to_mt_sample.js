const clientId = 'authentication_post_sample';
const currentSession = 'mt_session_' + clientId;
const currentToken = 'mt_token_' + clientId;
const nowTime = Math.floor(new Date().getTime() / 1000);
const apiUrl = 'https://mesh-test.movabletype.io/.data-api';
const siteId = '65560';
const username = 'mesh_test';
const password = 'mesh_test';

ajax ({
    url : apiUrl + '/v4/authentication',
    type : "post",
    data : {
        'username' : username,
        'password' : password,
        'clientId' : clientId,
	},
    dataType : "json",
    timeout : 5000,
    success : function ( contents ) {
		log("Sign In : OK");
		let TokenData = {
			'accessToken': contents.accessToken,
			'expiresIn': contents.expiresIn,
			'gotTokenTime': nowTime,
		}
		const entry = {};
		entry.title = 'test';
		entry.body = 'post test';
		entry.status = 'publish';
		ajax({
			url: apiUrl + '/v4/sites/' + siteId +'/entries',
			type: 'POST',
			dataType: 'json',
			headers: {
				'X-MT-Authorization': 'MTAuth accessToken=' + contents.accessToken,
			},
			data: {
				'entry': JSON.stringify(entry)
			},
            timeout : 5000,
            success : function ( contents ) {
                log("Post : OK");
				callbackSuccess( {
                    resultType : "continue"
                } );
            },
            error : function ( request, errorMessage ) {
                log("Post : NG");
                callbackSuccess( {
                    resultType : "continue"
                } );
            }
        });
    },
    error : function ( request, errorMessage ) {
        log("Sign In : Error");
        callbackSuccess( {
            resultType : "continue"
        } );
    }
});
 
return {
    resultType : "pause"
};
