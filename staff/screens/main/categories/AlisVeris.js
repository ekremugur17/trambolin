import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BrandList from '../../../components/main/BrandList';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Main extends Component {
  state = {
    brands: []
  }

  componentDidMount() {
    const { brands } = this.props;
    const keys = Object.keys(brands);
    const values = Object.values(brands);
    let array = [];
    for (let i = 0; i < keys.length; i++) {
      if (values[i].tags.includes('alış') || values[i].tags.includes('veriş')) {
        array.push(values[i]);
      }
    }
    this.setState({ brands: array });
  }

  loadedView = () => (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <BrandList onPress={(item) => this.props.navigation.navigate('Brand', { brand: item })} cards={this.state.brands} />
      </ScrollView>
    </View>
  )

  render() {
    return (
      this.state.brands ? <this.loadedView /> : null
    );
  }
}


const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    brands: auth.storage.brands
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  hrLine: {
    width: width,
    backgroundColor: '#42c0ef',
    height: 2,
  }
});


export default connect(mapStateToProps, {})(Main);