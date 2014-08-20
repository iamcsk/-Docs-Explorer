var sumArray = function (array,len,st) {
		  var s = (st !== undefined) ? st : 0; 	
		  for (var i = s, sum = 0; i < len; sum += parseFloat(array[i++]));
		  return sum;
		};



 
(function(){
 
    var convertBase = function (num) {
        this.from = function (baseFrom) {
            this.to = function (baseTo) {
                return parseInt(num, baseFrom).toString(baseTo);
            };
            return this;
        };
        return this;
    };
        
    // binary to decimal
    this.bin2dec = function (num) {
        return convertBase(num).from(2).to(10);
    };
    
    // binary to hexadecimal
    this.bin2hex = function (num) {
        return convertBase(num).from(2).to(16);
    };
    
    // decimal to binary
    this.dec2bin = function (num) {
        return convertBase(num).from(10).to(2);
    };
    
    // decimal to hexadecimal
    this.dec2hex = function (num) {
        return convertBase(num).from(10).to(16);
    };
    
    // hexadecimal to binary
    this.hex2bin = function (num) {
        return convertBase(num).from(16).to(2);
    };
    
    // hexadecimal to decimal
    this.hex2dec = function (num) {
        return convertBase(num).from(16).to(10);
    };
    
    return this;        
})();
 		

 function CalculateFinalLumValue(tint, lum)
{

    if (tint == null)
    {

        return lum;

    }

    var lum1 = 0;

    if (tint < 0)
    {

        lum1 = lum * (1.0 + tint);

    }

    else
    {

        lum1 = lum * (1.0 - tint) + (255 - 255 * (1.0 - tint));

    }

    return ~~(lum1);

} 

    CalculateFinalLumValue(0.59999389629810485,7)



    function tintToLight(x){
        return Math.round(parseInt(x)+(0.8*(255 - x)))
    }

    function tintToDark (x) {
        
    }



    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }