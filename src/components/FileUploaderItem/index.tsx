import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { getColor } from '../../styles/colors';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { Text } from '../Text';
import { Button } from '../Button';
import { defaultText } from '../../constants/defaultText';
import CloseIcon from '@carbon/icons/es/close/20';
import WarningFilledIcon from '@carbon/icons/es/warning--filled/20';
import CheckmarkFilledIcon from '@carbon/icons/es/checkmark--filled/20';
import { Loading } from '../Loading';

export type FileUploaderItemProps = {
  /** Name of the file */
  name: string;
  /** Status of the file upload (default is edit) */
  status?: 'uploading'|'edit'|'complete';
  /** Error text to show when invalid */
  errorTitle?: string;
  /** Error details to show when invalid */
  errorDetails?: string;
  /** Callback when the remove button is pressed. Will not show remove icon if not set or if type is not edit/undefined or invalid=true. */
  onDelete?: (event: GestureResponderEvent) => void;
  /** Indicate if file is invalid */
  invalid?: boolean;
  /** Text to use for delete file button (accessibility). Defaults to ENGLISH "Delete" */
  deleteFileButtonText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: ViewProps;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: getColor('layer01'),
  },
  mainWrapper: {
    flexDirection: 'row',
    minHeight: 48,
  },
  text: {
    padding: 13,
    paddingRight: 16,
    paddingLeft: 16,
    flex: 1,
  },
  indicator: {
    paddingLeft: 12,
    paddingTop: 13,
    height: 48,
    width: 48,
  },
  loadingIndicator: {
    marginTop: 4,
    marginLeft: 3,
  },
  errorWrapper: {
    borderTopColor: getColor('borderSubtle01'),
    borderTopWidth: 1,
    padding: 16,
    paddingTop: 15,
    paddingBottom: 15,
  },
  errorTitle: {
    color: getColor('supportError'),
  },
});

export class FileUploaderItem extends React.Component<FileUploaderItemProps> {
  private get visualIndicator(): React.ReactNode {
    const {status, invalid} = this.props;

    if (invalid) {
      return (
        <View style={styles.indicator}>
          {createIcon(WarningFilledIcon, 22, 22, getColor('supportError'))}
        </View>
      );
    } else if (status === 'uploading') {
      return (
        <View style={styles.indicator}>
          <Loading style={styles.loadingIndicator} type="small" />
        </View>
      );
    } else if (status === 'complete') {
      return (
        <View style={styles.indicator}>
          {createIcon(CheckmarkFilledIcon, 22, 22, getColor('supportInfo'))}
        </View>
      );
    }

    return null;
  }

  private get deleteItem(): React.ReactNode {
    const {status, invalid, onDelete, deleteFileButtonText} = this.props;

    if (typeof onDelete === 'function') {
      if (invalid || !status || status === 'edit') {
        return <Button kind="ghost" overrideColor={getColor('iconPrimary')} text={deleteFileButtonText || defaultText.deleteFile} iconOnlyMode={true} icon={CloseIcon} onPress={onDelete} />;
      }
    }

    return null;
  }

  private get errorArea(): React.ReactNode {
    const {errorDetails, errorTitle, invalid} = this.props;

    if (invalid && (errorDetails || errorTitle)) {
      return (
        <View style={styles.errorWrapper}>
          {!!errorTitle && <Text style={styles.errorTitle} type="body-compact-02" text={errorTitle} />}
          {!!errorDetails && <Text type="body-compact-02" text={errorDetails} />}
        </View>
      );
    }

    return null;
  }

  render(): React.ReactNode {
    const {componentProps, style, name} = this.props;

    return (
      <View style={styleReferenceBreaker(styles.wrapper, style)} {...(componentProps || {})}>
        <View style={styles.mainWrapper}>
          <Text style={styles.text} type="body-compact-02" text={name} breakMode="middle" />
          {this.visualIndicator}
          {this.deleteItem}
        </View>
        {this.errorArea}
      </View>
    );
  }
}