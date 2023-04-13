-- CLEAR TABLE --
drop table third_party_chart_of_account;
drop table chart_of_account;
drop table society_account;
drop table equivalent_currency_detail;
drop table society_equivalent_currency;
drop table society;
drop table account;
drop table currency;


-- Data test --
insert into currency values
('CUR01', 'AR'),
('CUR02', 'EUR'),
('CUR03', 'USD');


insert into account values
('ACC0001', 'admin@gmail.com', '12345678');


insert into society values
('SOC0001', 'DIMPEX', 'Tovo', 'Production articles industriels et vente de marchandises', 'ENCEINTE ITU ANDOHARANOFOTSY BP 1960 Antananarivo 101', 'Antananarivo', '2023-01-01', NULL, NULL, NULL, NULL, '2023-01-01', 'CUR01');


insert into society_equivalent_currency values
('EQC001', 'SOC0001');


insert into equivalent_currency_detail values
('EQD0001', 'EQC001', 'CUR02', 4500.),
('EQD0002', 'EQC001', 'CUR03', 3900.);


insert into society_account values
('SAC00001', 'ACC0001', 'SOC0001', 'society');


-- chart of account already imported --

insert into journal_code values 
('JCD001', 'AC', 'Achats'),
('JCD002', 'AN', 'A nouveau'),
('JCD003', 'BN', 'Banque BNI'),
('JCD004', 'BO', 'Banque BOA'),
('JCD005', 'CA', 'Caisse'),
('JCD006', 'OD', 'Opeations diverses'),
('JCD007', 'VL', 'Ventes locales'),
('JCD008', 'VE', 'Ventes a l exportation');