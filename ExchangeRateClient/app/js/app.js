
    var RatesStatus = React.createClass({
   loadRatesFromServer: function() {
     $.ajax({
       url: this.props.url,
       dataType: 'json',
       success: function(data) {
         this.setState({data: data.rates});
       }.bind(this)
     });
   },
   getInitialState: function() {
     return {data: null};
   },
   componentWillMount: function() {
     this.loadRatesFromServer();
     setInterval(this.loadRatesFromServer, this.props.pollInterval);
   },
   render: function() {
     if (this.state.data == null) {
       return <div>Loading...</div>;

    }else{
     return (
       <div>
         <Rates data={this.state.data} />
       </div>
     );
   }
   }
 });

 function mapObject(object, callback) {
   return Object.keys(object).map(function (key) {
     return callback(key, object[key]);
   });
 }

 var Rates = React.createClass({
   render: function() {
     var i = 0;
    var ratesNodes = mapObject(this.props.data, function (key, value) {
      i++;
       return <li key={i} className="rates-line"><span className="currency-name">{key}:</span>
              <span className="currency-value">{value}</span></li>;
     });
     return <ul className="rates-block">{ratesNodes}</ul>;
   }
 });


 ReactDOM.render(
   <RatesStatus url="http://localhost:3000/rates" pollInterval={5000} />,
   document.getElementById('content')
 );
