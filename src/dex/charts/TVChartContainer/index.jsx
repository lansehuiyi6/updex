import * as React from 'react';
import './index.css';
import {connect} from "dva";
import historyProvider from "./api/historyProvider";

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class TVChartContainer extends React.PureComponent {

	state = {
    containerId: 'tv_chart_container',
	  barsLoaded: false
  }

  tvWidget = null;

  componentDidMount() {
    //const param = location.pathname.replace(`${match.path}/`, '')
    const symbol = window.location.hash.replace('#/pc/trade2/', '')
	  this.initChart(symbol)
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

	initChart(symbol) {
	  const _this = this
		const widgetOptions = {
			debug: false,
			symbol: symbol,
			datafeed: {
        onReady: cb => {
          console.log('=====onReady running')
          setTimeout(() => cb({
            supports_search: true,
            supports_group_request: false,
            supports_marks: true,
            exchanges: [],
            symbolsTypes: [],
            supported_resolutions: ["1", "15", "60", "240", "D"]
          }), 0)
        },
        searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
          console.log('====Search Symbols running')
        },
        resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
          window.SYMBOLE_CHANGE = onSymbolResolvedCallback
          setTimeout(() => {
            onSymbolResolvedCallback({
              name: symbolName,
              ticker: symbolName,
              description: symbolName,
              has_intraday: true,
              timezone: 'Asia/Shanghai',
              minmov: '1',
              minmov2: 0,
              session: '24x7',
              pricescale: 1000000,
              has_no_volume: false,
              volume_precision:5
              // expired: true,
              // expiration_date: 1527379200000
            })
          }, 0)
        },
        getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
          console.log('=====getBars running', _this.state.barsLoaded)
          if (_this.state.barsLoaded) {
            setTimeout(() => {
              onHistoryCallback([], {noData: true})
            }, 0)
          } else {
            historyProvider.getLoopringBars(symbolInfo, resolution, from, to, firstDataRequest)
              .then(bars => {
                _this.setState({barsLoaded: true})
                if (bars.length) {
                  onHistoryCallback(bars, {noData: false})
                } else {
                  onHistoryCallback(bars, {noData: true})
                }
              }).catch(err => {
                console.log({err})
                onErrorCallback(err)
              })
          }
        },
        subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
          console.log('=====subscribeBars runnning')
          window.TrendCallBack = onRealtimeCallback
          //TODO mock
          let time = 1536745511000
          setInterval(() => {
            const mock = {
              close:0.0012,
              high:0.004,
              //isBarClosed: true,
              //isLastBar: false,
              low:0.0011,
              open:0.0012,
              time:time,
              volume:12
            }
            time = time + 3600000
            //onRealtimeCallback(mock)
          }, 1000)
          //stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
        },
        unsubscribeBars: subscriberUID => {
          console.log('=====unsubscribeBars running')
          //stream.unsubscribeBars(subscriberUID)
        },
        getServerTime: cb => {
          console.log('=====getServerTime running')
        }
      },
      interval: 60,
      timeframe: 3600,
      toolbar_bg: "transparent",
			container_id: this.state.containerId,
			library_path: '/charting_library/',
			locale: getLanguageFromURL() || 'en',
      disabled_features: [
        "use_localstorage_for_settings",
        "header_widget",
        "context_menus",
        "edit_buttons_in_legend",
        "border_around_the_chart",
        // "control_bar",
        "timeframes_toolbar",
        "left_toolbar",
        "volume_force_overlay"
      ],
			enabled_features: [
			  'move_logo_to_main_pane',
        'hide_last_na_study_output'
      ],
			charts_storage_url: 'https://saveload.tradingview.com',
			charts_storage_api_version: '1.1',
			client_id: 'tradingview.com',
			user_id: 'public_user_id',
      width: '100%',
      height: '100%',
			fullscreen: false,
			autosize:false,
      loading_screen: {
        backgroundColor: "transparent"
      },
      // ...getOverides(),
      //   overrides: {
      //     "volumePaneSize": "large",
  				// "mainSeriesProperties.showCountdown": true,
  				// "paneProperties.background": "#08274c",
  				// "paneProperties.vertGridProperties.color": "#363c4e",
  				// "paneProperties.horzGridProperties.color": "#363c4e",
  				// "symbolWatermarkProperties.transparency": 90,
  				// "scalesProperties.textColor" : "#AAA",
  				// "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
  				// "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
      //     //"paneProperties.topMargin": 20,
      //     //"paneProperties.bottomMargin": 40,
      //   },
      overrides: {
        editorFontsList: ['Roboto', 'Times New Roman', 'Arial'] ,
        // 蜡烛图
        "mainSeriesProperties.candleStyle.upColor": '#558b2f',
        "mainSeriesProperties.candleStyle.borderUpColor": '#558b2f',
        "mainSeriesProperties.candleStyle.wickUpColor": '#558b2f',

        "mainSeriesProperties.candleStyle.downColor": "#c2185b",// "#c2185b",
        "mainSeriesProperties.candleStyle.borderDownColor": "#c2185b",
        "mainSeriesProperties.candleStyle.wickDownColor": "#c2185b",

        "paneProperties.background": "transparent", // 背景色彩
        "paneProperties.vertGridProperties.color": "rgba(255,255,255,0.02)", // 背景网格颜色
        "paneProperties.horzGridProperties.color": "rgba(255,255,255,0.02)", // 背景网格颜色

        // x,y周
        "scalesProperties.lineColor": "rgba(255,255,255,0.05)", // x,y坐标轴的颜色
        "scalesProperties.textColor": "rgba(255,255,255,0.3)", // x,y坐标轴字体的颜色
        "scalesProperties.backgroundColor" : "#558b2f",

        "volumePaneSize": "large",
        "mainSeriesProperties.showCountdown": true,
        "symbolWatermarkProperties.transparency": 20,
        "paneProperties.topMargin": 10,
        "paneProperties.bottomMargin": '10px',
      },
      studies_overrides: {
        //--------------------volume
        "volume.volume.color.0": "#558b2f",
        "volume.volume.color.1": "#c2185b",
      }
		};
    const tvWidget = new window.TradingView.widget(widgetOptions);
    this.tvWidget = tvWidget
    tvWidget.onChartReady(() => {
      console.log('Chart has loaded!', tvWidget)
    });
	}

	render() {
		return (
			<div
				id={ this.state.containerId }
        style={{height:'100%'}}
				className={ 'TVChartContainer' }
			/>
		);
	}
}

function mapToProps(state) {
  return {
    trends:state.sockets.trends.items,
  }
}

export default (connect(mapToProps)(TVChartContainer));
