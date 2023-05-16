import React, { useEffect, useState } from 'react';
import { Button } from '@/_ui/LeftSidebar';
import { Alert } from '@/_ui/Alert/';

export const ApiKeyContainer = ({
  copilotApiKey = '',
  handleOnSave,
  isLoading = false,
  darkMode,
  isCopilotEnabled,
}) => {
  const [inputValue, setInputValue] = useState(copilotApiKey);

  const handleOnchange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(copilotApiKey);
  }, [copilotApiKey]);

  return (
    <div className="container-xl mt-3">
      <div className="row">
        <small className="text-green">
          <img className="encrypted-icon" src="assets/images/icons/padlock2.svg" width="12" height="12" />
          <span className="text-success mx-2 font-500">API密钥</span>
        </small>
        <div className="mb-3 col-6">
          <input
            disabled={!isCopilotEnabled}
            type="password"
            class="form-control mt-2"
            name="example-text-input"
            placeholder=""
            value={inputValue}
            onChange={handleOnchange}
          />
        </div>
        <div className="col-auto mt-1">
          <Button
            onClick={() => handleOnSave(inputValue)}
            darkMode={darkMode}
            size="md"
            isLoading={isLoading}
            styles={{ backgroundColor: '#3E63DD', color: '#fff' }}
            disabled={!isCopilotEnabled}
          >
            <Button.Content title={'Save'} iconSrc={'assets/images/icons/save.svg'} />
          </Button>
        </div>
      </div>

      <div className="alert-container">
        <Alert svg="alert-info" cls="copilot-alert" data-cy={`copilot-alert-info`}>
          <h4 class="alert-title"> 没有API密钥?</h4>
          <div class="text-muted">
            <strong style={{ fontWeight: 700, color: '#3E63DD' }}>ToolJet Copilot </strong>
            当前在 <strong style={{ fontWeight: 700, color: '#3E63DD' }}>内测</strong>.
            加入我们的等待名单，当API密钥可用时您将收到通知.
          </div>
          <div className="mt-2 w-25">
            <Button
              onClick={() => window.open('https://tooljet.com/copilot', '_blank')}
              darkMode={darkMode}
              size="sm"
              styles={{ width: '100%', fontSize: '12px', fontWeight: 500, borderColor: darkMode && 'transparent' }}
            >
              <Button.Content title={' 注册内测账号'} />
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};