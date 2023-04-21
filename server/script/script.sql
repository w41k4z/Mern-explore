CREATE TABLE chart_of_account (
    id VARCHAR(8) PRIMARY KEY,
    account_number VARCHAR(5) NOT NULL, -- is unique for each society
    society_id VARCHAR(7) REFERENCES society(id),
    entitled VARCHAR(50)
);
ALTER TABLE chart_of_account
  ADD CONSTRAINT uq_chart_of_account UNIQUE(account_number, society_id);
CREATE TABLE third_party_chart_of_account (
    thd_pt_chrt_acc_id VARCHAR(8) PRIMARY KEY,
    key VARCHAR(5) NOT NULL, -- is unique for each society
    society_id VARCHAR(8) REFERENCES society(id),
    value VARCHAR(25) NOT NUll
);
ALTER TABLE third_party_chart_of_account
  ADD CONSTRAINT uq_third_party_chart_of_account UNIQUE(key, value);

CREATE TABLE journal_code (
    id VARCHAR(6) PRIMARY KEY,
    code VARCHAR(2) NOT NULL,
    entitled VARCHAR(25) NOT NULL
);
CREATE TABLE journal (
    id VARCHAR(8) PRIMARY KEY,
    society_id VARCHAR(8) REFERENCES society(id),
    journal_date DATE NOT NULL,
    piece_number INT,
    part_reference VARCHAR(25) NOT NULL,
    general_account VARCHAR(8) NOT NULL, -- hard to reference 'cause each society has its own chart of account
    third_party_account VARCHAR(8), -- can be null so not possible to reference
    entitled VARCHAR(50) NOT NULL,
    label TEXT,
    debit REAL,
    credit REAL
);