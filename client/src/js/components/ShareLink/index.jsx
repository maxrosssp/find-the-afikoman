import React, { useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import './ShareLink.css';

function ShareLink({
  urlid
}) {
  const shareLink = window.location.origin + '/game/join/' + urlid;
  const [copied, setCopied] = useState(false);

  function copyLink() {
    var textField = document.createElement('textarea');
    textField.innerText = shareLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopied(true);
  }

  return (
    <InputGroup className="share-link">
      <FormControl value={shareLink} disabled />
      <InputGroup.Append>
        <Button variant="secondary" onClick={copyLink}>{copied ? 'Copied!' : 'Copy'}</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default ShareLink;
