import React, {useState} from 'react';
import {ActivityIndicator, Modal, SafeAreaView, View} from 'react-native';
import WebView from 'react-native-webview';
// import axios from 'axios';
const App: React.FC = () => {
  // function fetchPage(url: string): Promise<string | undefined> {
  //   const HTMLData = axios
  //     .get(url)
  //     .then(res => console.log(typeof res.data))
  //     .catch((error: AxiosError) => {
  //       console.error(`There was an error with ${error.config.url}.`);
  //       console.error(error.toJSON());
  //     });

  //   return HTMLData;
  // }
  // const data = fetchPage(
  //   'https://buckacademy.unhosting.site/mod/h5pactivity/view.php?id=5',
  // );
  const jsCode = `
  document.getElementsByTagName('h2')[0].style.display='none'
  document.getElementsByTagName('nav')[0].style.display='none'
  document.getElementsByTagName('footer')[0].style.display='none'
  document.getElementsByTagName('h1')[0].style.display='none'
  document.getElementsByTagName('ol')[0].style.display='none'
  document.getElementsByTagName('span')[0].style.display='none'
  document.getElementById("intro").style.display="none";
  document.getElementsByClassName('activity-information')[0].style.display='none'
  document.getElementsByClassName('col-12 pt-3 pb-3')[0].style.display='none'
  document.getElementsByClassName('reportlink mb-3')[0].style.display='none'
  document.getElementsByClassName('reportlink mb-3')[0].style.display='none'
  `;

  const INJECTED_JAVASCRIPT = `(function() {
    document.getElementsByTagName('h2')[0].style.display='none'
  document.getElementsByTagName('nav')[0].style.display='none'
  document.getElementsByTagName('footer')[0].style.display='none'
  document.getElementsByTagName('h1')[0].style.display='none'
  document.getElementsByTagName('ol')[0].style.display='none'
  document.getElementsByTagName('span')[0].style.display='none'
  document.getElementById("intro").style.display="none";
  document.getElementsByClassName('activity-information')[0].style.display='none'
  document.getElementsByClassName('col-12 pt-3 pb-3')[0].style.display='none'
  document.getElementsByClassName('reportlink mb-3')[0].style.display='none'
  document.getElementsByClassName('reportlink mb-3')[0].style.display='none'
})();`;

  const [showIndicator, setIndicator] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={showIndicator}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating size="large" color="#00ff00" />
        </View>
      </Modal>

      <WebView
        ref={ref => {
          this.webView = ref;
        }}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        source={{
          uri: 'https://buckacademy.unhosting.site/auth/userkey/login.php?key=09bc23a46a5eae509fa2289a94d1673b&wantsurl=https://buckacademy.unhosting.site/mod/h5pactivity/view.php?id=5',
        }}
        style={{flex: 1, backgroundColor: 'black'}}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        injectedJavaScript={jsCode}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly
        injectedJavaScriptForMainFrameOnly
        // domStorageEnabled={true}
        // mediaPlaybackRequiresUserAction={true}
        startInLoadingState={true}
        onNavigationStateChange={event => {
          console.log('onChange');
        }}
        onLoadStart={() => {
          console.log('Start');
          // setIndicator(true);
        }}
        onLoadEnd={() => {
          console.log('End');
          setTimeout(() => {
            setIndicator(false);
          }, 1500);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
