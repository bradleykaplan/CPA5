//change screen code from https://reactnavigation.org/docs/getting-started

//import React, {useState} from 'react';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ValueProvider, { useValue } from './ValueContext';

var lineupdict = { qbs: 0, rbs: 0, wrs: 0, tes: 0, defs: 0 };

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to League Settings"
        onPress={() => navigation.navigate('League Settings')}
      />
      <Button
        title="Go to Lineup"
        onPress={() => navigation.navigate('Lineup')}
      />
      <Button
        title="Go to Trade"
        onPress={() => navigation.navigate('Trade')}
      />
      <Button
        title="Go to Projections"
        onPress={() => navigation.navigate('Projections')}
      />
      <Image
        style={{ flex: 1 }}
        source={require('./my-fantasy-football-team-is-kind-of-a-big-deal.jpg')}
      />
    </View>
  );
}

function LeagueSettingsScreen({ navigation }) {
  let { currentValue } = useValue();
  const [qbs, setqbs] = useState('');
  const [rbs, setrbs] = useState('');
  const [wrs, setwrs] = useState('');
  const [tes, settes] = useState('');
  const [defs, setdefs] = useState('');
  const getlineup = async () => {
    lineupdict = { qbs: qbs, rbs: rbs, wrs: wrs, tes: tes, defs: defs };
  };
  useEffect(() => {
    getlineup();
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>League Settings Screen</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="number of QBs"
        onChangeText={(text) => {
          setqbs(text);
          getlineup();
        }}
      />
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="number of RBs"
        onChangeText={(text) => {
          setrbs(text);
          getlineup();
        }}
      />
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="number of WRs"
        onChangeText={(text) => {
          setwrs(text);
          getlineup();
        }}
      />
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="number of TEs"
        onChangeText={(text) => {
          settes(text);
          getlineup();
        }}
      />
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="number of D/STs"
        onChangeText={(text) => {
          setdefs(text);
          getlineup();
        }}
      />
      <Button
        title="Go to Lineup"
        onPress={() => navigation.navigate('Lineup')}
      />
      <Button
        title="Go to Trade"
        onPress={() => navigation.navigate('Trade')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text> DEBUGGING </Text>
      <Text> QBs:{qbs} </Text>
      <Text> RBs:{rbs} </Text>
      <Text> WRs:{wrs} </Text>
      <Text> TEs:{tes} </Text>
      <Text> DEFs:{defs} </Text>
      <Text> contextvalue:{currentValue} </Text>
    </View>
  );
}
//parseint from https://www.tutorialspoint.com/how-to-convert-a-string-into-integer-in-javascript
function LineupScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Lineup Screen</Text>
      <Text>QBs:</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        multiline = {true}
        numberOfLines={parseInt(lineupdict['qbs'])}
        placeholder="QBs"
      />
      <Text>RBs:</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        multiline = {true}
        numberOfLines={parseInt(lineupdict['rbs'])}
        placeholder="RBs"
      />
      <Text>WRs:</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        multiline = {true}
        numberOfLines={parseInt(lineupdict['wrs'])}
        placeholder="WRs"
      />
      <Text>TEs:</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        multiline = {true}
        numberOfLines={parseInt(lineupdict['tes'])}
        placeholder="TEs"
      />
      <Text>D/STs:</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        multiline = {true}
        numberOfLines={parseInt(lineupdict['defs'])}
        placeholder="D/STs"
      />
      <Button
        title="Go to League Settings"
        onPress={() => navigation.navigate('League Settings')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Go to Trade"
        onPress={() => navigation.navigate('Trade')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text> DEBUGGING </Text>
      <Text> QBs: {lineupdict['qbs']} </Text>
      <Text> RBs: {lineupdict['rbs']} </Text>
      <Text> WRs: {lineupdict['wrs']} </Text>
      <Text> TEs: {lineupdict['tes']} </Text>
      <Text> DEFs: {lineupdict['defs']} </Text>
    </View>
  );
}

//dictionary info from https://www.poftut.com/how-create-and-use-dictionary-in-javascript-tutorial-with-examples/

function TradeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [yourplayer, setyourplayer] = useState('');
  const [opponentplayer, setopponentplayer] = useState('');
  const [yourscore, setyourscore] = useState();
  const [oppscore, setoppscore] = useState();
  //const [playerbetter, setplayerbetter] = useState('');
  //if statement variable from https://stackoverflow.com/questions/42107191/if-else-condition-inside-function-in-javascript
  var playerbetter = function (yourscore, oppscore) {
    if (yourscore > oppscore) {
      return yourplayer;
    } else if (oppscore > yourscore) {
      return opponentplayer + " (opponent's player)";
    } else {
      return '*input players*';
    }
  };
  var playerdict = {
    'Aaron Rodgers': 1,

    'Lamar Jackson': 100,

    'Patrick Mahomes': 50,
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Trade Screen</Text>
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="Your Player"
        onChangeText={(text) => {
          setyourplayer(text);
          setyourscore(playerdict[text]);
          //if(yourscore > oppscore) {
          //setplayerbetter(text);
          //}
        }}
      />
      <TextInput
        style={{ fontSize: 20, backgroundColor: 'yellow' }}
        placeholder="Opponent's Player"
        onChangeText={(text) => {
          setopponentplayer(text);
          setoppscore(playerdict[text]);
        }}
      />
      <View>
      <Text> the better player is </Text>
      </View>
      <View>
      <Text> {playerbetter(yourscore, oppscore)} </Text>
      </View>
      <Button
        title="Go to League Settings"
        onPress={() => navigation.navigate('League Settings')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text> Your Player: {yourplayer} </Text>
      <Text> Opponent Player: {opponentplayer} </Text>
      <Text> Your Score: {yourscore} </Text>
      <Text> Opponent Score: {oppscore} </Text>
      <Text> Better Player: {playerbetter(yourscore, oppscore)} </Text>
    </View>
  );
}

function ProjectionsScreen({ navigation }) {
  const QBs = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aaron Rodgers',
      points: 1,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Lamar Jackson',
      points: 100,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Patrick Mahomes',
      points: 50,
    },
  ];
  const RBs = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Alvin Kamara',
      points: 100,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Nick Chubb',
      points: 10,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Kareem Hunt',
      points: 0,
    },
  ];
  const WRs = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Stefon Diggs',
      points: 1000.9,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Tyreek Hill',
      points: 20.1,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Devonta Smith',
      points: 2000.5,
    },
  ];
  const TEs = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Darren Waller',
      points: 984.32,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Zach Ertz',
      points: 10.02,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Mark Andrews',
      points: 503.48,
    },
  ];
  const DEFs = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Philadelphia Eagles',
      points: 543.85,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'New England Patriots',
      points: 22.28,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Baltimore Ravens',
      points: 55.65,
    },
  ];

  const Item = ({ item }) => {
    return (
      <View style={{ padding: 20, margin: 10, backgroundColor: '#ccf' }}>
        <Text style={{ fontSize: 24 }}>{item.title}</Text>
        <Text>{item.points}</Text>
      </View>
    );
  };

  function covid_before(a, b) {
    var keyA = a.points,
      keyB = b.points;
    // Compare the 2 dates
    //if (a.state<b.state) return -1;
    //if (a.state>b.state) return 1;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  }
//safeareaview from react documentation
  return (
    <SafeAreaView style={styles.container}>
      <Text> QBs: </Text>
      <FlatList
        data={QBs.sort(covid_before)}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Text> RBs: </Text>
      <FlatList
        data={RBs.sort(covid_before)}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Text> WRs: </Text>
      <FlatList
        data={WRs.sort(covid_before)}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Text> TEs: </Text>
      <FlatList
        data={TEs.sort(covid_before)}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Text> DEFs: </Text>
      <FlatList
        data={DEFs.sort(covid_before)}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="League Settings" component={LeagueSettingsScreen} />
        <Stack.Screen name="Lineup" component={LineupScreen} />
        <Stack.Screen name="Trade" component={TradeScreen} />
        <Stack.Screen name="Projections" component={ProjectionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
    margin: '20px',
  },
});

export default App;
