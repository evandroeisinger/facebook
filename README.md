# [Facebook Exporter](http://evandroeisinger.github.com/facebook)

It's a simple Facebook page dump exporter. Which returns the entire page content, so you can manipulate as you like.

## Usage

``` js
// setup
$.Facebook({ 
	token    : '390648241005588|Dfb2X2n-4MuwRPXLNz8TTkEU2Ug',
	page     : 'wikicidade',
	onStart  : function(){ /* ... */ }, // optional
  	onLoop   : function(){ /* ... */ }, // optional
	onFinish : function(){ /* ... */ }, // optional
	onError  : function(){ /* ... */ }, // optional
	log      : true // optional
});

// start dump
$.Facebook().start();
```

## Configuration

<table>
  <tr>
    <td><strong>Option</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Description</strong></td>
  </tr>
  <tr>
    <td>token</td>
    <td>String</td>
    <td>Access Token is required to perform API calls requests. You can get it through Facebook API, (https://developers.facebook.com/docs/reference/apis), or via the Graph API Explorer (https://developers.facebook.com/tools/explorer).</td>
  </tr>
  <tr>
    <td>page</td>
    <td>String</td>
    <td>The name of the page you want to retrieve</td>
  </tr>
  <tr>
    <td>log</td>
    <td>Boolean</td>
    <td>If you want to release the application log. (Browser console)</td>
  </tr>
  <tr>
    <td>onStart</td>
    <td>Function</td>
    <td>Callback function fired when dump start. Return the response with the dump request. </td>
  </tr>
  <tr>
    <td>onLoop</td>
    <td>Function</td>
    <td>Callback function fired for each object received. Return the object data. </td>
  </tr>
  <tr>
    <td>onFinish</td>
    <td>Function</td>
    <td>Callback function fired when the process ends</td>
  </tr>
  <tr>
    <td>onError</td>
    <td>Function</td>
    <td>Callback function fired when some error happens. Return the error log.</td>
  </tr>
</table>
