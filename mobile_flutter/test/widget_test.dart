import 'package:flutter_test/flutter_test.dart';

import 'package:smartoutfit_app/main.dart';

void main() {
  testWidgets('renders Smart Outfit shell', (WidgetTester tester) async {
    await tester.pumpWidget(const SmartOutfitApp());

    expect(find.text('SMART OUTFIT'), findsOneWidget);
    expect(find.text('My Wardrobe'), findsOneWidget);
    expect(find.text('All'), findsOneWidget);
    expect(find.text('Add'), findsOneWidget);
  });

  testWidgets('shows backend error state after failed load', (tester) async {
    await tester.pumpWidget(const SmartOutfitApp());
    await tester.pumpAndSettle();

    expect(find.text('Cannot connect to backend'), findsOneWidget);
  });
}
