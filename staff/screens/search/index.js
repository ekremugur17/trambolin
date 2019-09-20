import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SearchBar, } from 'react-native-elements'
import Icon from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';
import BrandList from '../../components/main/BrandList';

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: null,
      headerLeft: <Icon style={{ paddingLeft: 15 }} color='#222222' onPress={() => navigation.pop()} name='ios-arrow-back' size={30} />
    }
  }

  state = {
    search: '',
    filteredBrands: []
  }

  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch = (search) => {
    const newSearch = search.toLowerCase();
    this.setState({ search });
    const { brands } = this.props;
    const keys = Object.keys(brands);
    const values = Object.values(brands);
    let array = [];
    for (let i = 0; i < keys.length; i++) {
      if (values[i].brand == 'Cafe Nero') {
        continue;
      }
      if (search == '') {
        this.setState({ filteredBrands: brands.filter(brand => brand.brand !== 'Cafe Nero') });
        return;
      }
      if (values[i].company.toLowerCase().includes(newSearch)) {
        array.push(values[i]);
        continue;
      }
      for (let k = 0; k < values[i].tags.length; k++) {
        if (values[i].tags[k].toLowerCase().includes(newSearch)) {
          array.push(values[i]);
          break;
        };
      }
      if (values[i].brand) {
        if (values[i].brand.toLowerCase().includes(newSearch)) array.push(values[i])
      }
    }

    this.setState({ filteredBrands: array });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ width: '100%', height: 50, marginBottom: 10, zIndex: 100 }}>
          <SearchBar autoFocus={true} placeholder="Ara" value={this.state.search} lightTheme style={{ backgroundColor: '#fff', color: '#111', fontFamily: 'Poppins-Medium' }} onChangeText={(text) => this.handleSearch(text)} round />
        </View>
        {this.state.filteredBrands.length == 0 &&
          <View>
            <Text style={{ marginTop: 20 }}>Koca bir hiçlik...</Text>
          </View>
        }
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, zIndex: 10 }} >
          <BrandList onPress={(item) => this.props.navigation.navigate('Brand', { brand: item })} cards={this.state.filteredBrands} />
        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    brands: auth.storage.brands
  }
}

export default connect(mapStateToProps)(Search);