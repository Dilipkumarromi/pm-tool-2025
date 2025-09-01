/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Toggle,
  ButtonToolbar,
  Dropdown,
  TagGroup,
  Tag,
} from "rsuite";
import GearIcon from "@rsuite/icons/Gear";
import "./style.css";

const ActionDropdown = ({ data }: any) => {
  const dropdownOptions = data;
  const [selectedLabel, setSelectedLabel] = useState("Change status...");
  const [searchValue, setSearchValue] = useState("");

  // Filter options by search
  const filteredOptions = dropdownOptions.filter((item: any) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className="relative">
        <Dropdown
          placement="bottomStart"
          trigger="click"
          container={() => document.body}
          onSelect={(eventKey: any) => {
            const selectedItem = dropdownOptions.find(
              (item: any) => item.value === eventKey
            );
            if (selectedItem) {
              setSelectedLabel(selectedItem.label);
            }
          }}
          renderToggle={(props, ref) => {
            const { container, menuClassName, ...buttonProps }: any = props;
            return (
              <span ref={ref}>
                <Button
                  {...buttonProps}
                  startIcon={<GearIcon />}
                  size="sm"
                  className="px-2 py-1"
                >
                  {selectedLabel}
                </Button>
              </span>
            );
          }}
          menuClassName="action-dropdown-menu-above-modal"
        >
          {/* Search bar inside dropdown */}
          <div >
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(val) => setSearchValue(val)}
               
            />
          </div>

          {/* Filtered items */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item: any) => (
              <Dropdown.Item
                key={item.key}
                eventKey={item.value}
                className="flex items-center"
              >
                <div
                  className="flex items-center"
                  style={{ gap: "1px", width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "150px",
                    }}
                  >
                    <span
                      style={{ padding: "3px" }}
                      className="text-gray-500 text-sm"
                    >
                      <GearIcon />
                    </span>
                    <span
                      style={{
                        padding: "3px",
                        textAlign: "left",
                        flex: 1,
                      }}
                      className={
                        item.active
                          ? "text-blue-500 text-sm"
                          : "text-gray-800 text-sm"
                      }
                    >
                      {item.label}
                    </span>
                    <span
                      style={{ padding: "3px" }}
                      className="text-gray-500 text-sm"
                    >
                      {item.count}
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default ActionDropdown;
