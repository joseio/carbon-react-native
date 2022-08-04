import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Tag, Checkbox } from 'carbon-react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
});

export default class TestTag extends React.Component {
  state = {
    disabled: false,
    showFilterClose: false,
  }

  private textTypes = ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray'];

  render(): React.ReactNode {
    const {disabled, showFilterClose} = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} style={styles.view}>
        <Text style={{marginBottom: 16}} type="heading-04" text="Tag" />
        <Checkbox checked={showFilterClose} id="filterClose" onPress={value => this.setState({showFilterClose: value})} label="Show close" />
        <Checkbox style={{marginBottom: 16}} checked={disabled} id="disable" onPress={value => this.setState({disabled: value})} label="Make disabled" />
        <Tag style={{marginBottom: 16}} title="Default with long text that is really long and probably going to wrap." disabled={disabled} onClosePress={showFilterClose ? () => Alert.alert('Pressed filter close', 'default') : undefined} />
        {this.textTypes.map(type => <Tag key={type} style={{marginBottom: 16}} tagType={type as any} title={type} disabled={disabled} onClosePress={showFilterClose ? () => Alert.alert('Pressed filter close', type) : undefined} />)}
      </ScrollView>
    );
  }
}